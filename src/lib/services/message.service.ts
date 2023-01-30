import { Injectable } from '@angular/core';
import { MoonlightMessage } from "../types/moonlightMessage";
import { forkJoin, map, Observable, switchMap } from "rxjs";
import { MoonlightChannel } from "../types/moonlightChannel";
import { PocketbaseService } from "./internal/pocketbase.service";
import { fromPromise } from "rxjs/internal/observable/innerFrom";
import { UserService } from "./user.service";
import { ChannelService } from "./channel.service";
import { MessageDto } from "./internal/dto/message-dto";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private readonly pb: PocketbaseService,
    private readonly userService: UserService,
    private readonly channelService: ChannelService,
  ) {
  }

  public send(message: MoonlightMessage): Observable<boolean> {
    const data = {
      channel: message.channel.id,
      messageContent: message.content,
      author: message.author.id,
    }

    return fromPromise(this.pb.get.collection('messages').create(data))
      .pipe(
        map(result => result !== undefined),
      );
  }

  public receiveLog(target: MoonlightChannel, until: number = 50, from: number = 0): Observable<MoonlightMessage[]> {
    return this.receiveDtoLog(target, until, from)
      .pipe(
        switchMap((dtos: MessageDto[]) => {
          return forkJoin(dtos.map((msgDto) => {
            return forkJoin({
              author: this.userService.getUser(msgDto.author),
              channel: this.channelService.getChannel(msgDto.channel),
            }).pipe(
              map((result) => {
                const output: MoonlightMessage = {
                  author: result.author,
                  channel: result.channel,
                  content: msgDto.messageContent,
                  created: new Date(msgDto.created).getTime(),
                  id: msgDto.id,
                };
                return output;
              }),
            );
          }));
        }),
      );
  }

  private receiveDtoLog(target: MoonlightChannel, until: number = 50, from: number = 0): Observable<MessageDto[]> {
    return fromPromise(this.pb.get.collection('messages').getList<MessageDto>(1, until, {
      sort: '-created',
      filter: `channel="${ target.id }"`,
    })).pipe(
      map((result) => result.items),
    );
  }
}
