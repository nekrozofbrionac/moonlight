import { Injectable } from '@angular/core';
import { MoonlightMessage } from "../types/moonlightMessage";
import { map, Observable, of, tap } from "rxjs";
import { MoonlightChannel } from "../types/moonlightChannel";
import { PocketbaseService } from "./internal/pocketbase.service";
import { fromPromise } from "rxjs/internal/observable/innerFrom";
import { MoonlightUser } from "../types/moonlightUser";
import { Record } from "pocketbase";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private mockMap: Map<MoonlightChannel, MoonlightMessage[]> = new Map<MoonlightChannel, MoonlightMessage[]>();

  constructor(
    private readonly pb: PocketbaseService,
  ) {
  }

  send(message: MoonlightMessage): Observable<boolean> {
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

  receiveLog(target: MoonlightChannel, until: number = 50, from: number = 0): Observable<MoonlightMessage[]> {
    return fromPromise(this.pb.get.collection('messages').getList(1, until, {
      sort: '-created',
      filter: `channel="${ target.id }"`,
      expand: 'author,channel,channel.users',
    })).pipe(
      tap(result => {
        console.log(result);
      }),
      map((result) => {
        const bruh = result.items.map((item) => {
          const output: MoonlightMessage = {
            id: item.id,
            created: new Date(item.created).getTime(),
            author: this.extractUserFromRecord(item.expand['author'] as Record),
            channel: this.extractChannelFromRecord(item.expand['channel'] as Record),
            content: item['messageContent'],
          };
          return output;
        });
        console.log(bruh);
        return bruh;
      }),
    );
  }

  private readonly extractChannelFromRecord: (record: Record) => MoonlightChannel = (item) => {
    return {
      id: item.id,
      name: item['name'],
      users: item.expand['users'].map(this.extractUserFromRecord),
    };
  }

  private readonly extractUserFromRecord: (item: Record) => MoonlightUser = (item) => {
    return {
      id: item.id,
      username: item['username'],
      name: item['name'],
    };
  }
}
