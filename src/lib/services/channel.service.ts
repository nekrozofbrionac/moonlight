import { Injectable } from '@angular/core';
import { MoonlightChannel, NullMoonlightChannel } from "../types/moonlightChannel";
import { LoginService } from "./login.service";
import { forkJoin, map, Observable, of, switchMap, tap } from "rxjs";
import { PocketbaseService } from "./internal/pocketbase.service";
import { fromPromise } from "rxjs/internal/observable/innerFrom";
import { ListResult } from "pocketbase";
import { MoonlightUser } from "../types/moonlightUser";
import { UserService } from "./user.service";
import { ChannelDto } from "./internal/dto/channel-dto";
import { LocalStorageService } from "./internal/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(
    private readonly loginService: LoginService,
    private readonly pb: PocketbaseService,
    private readonly userService: UserService,
    private readonly localStorageService: LocalStorageService,
  ) {
  }

  public getChannel(channelId: string): Observable<MoonlightChannel> {
    const cachedChannel = this.localStorageService.retrieveChannel(channelId);
    if (cachedChannel !== undefined) {
      return of(cachedChannel);
    }

    return fromPromise(this.pb.get.collection('channels').getOne<ChannelDto>(channelId))
      .pipe(
        switchMap((channelDto: ChannelDto) => {
          return forkJoin(channelDto.users.map(userId => this.userService.getUser(userId)))
            .pipe(
              map(this.usersToTheirChannel(channelDto)),
              tap((channel) => this.localStorageService.storeChannel(channel)),
            );
        }),
      );
  }

  public getConversations(): Observable<MoonlightChannel[]> {
    const selfUser = this.loginService.getSelfUser();
    if (selfUser === undefined) {
      return of([NullMoonlightChannel]);
    }
    // some arcane logic using selfUser but not implemented yet

    return fromPromise(this.pb.get.collection('channels').getList<ChannelDto>(1, 50, {
      filter: `users~"${ selfUser.id }"`,
    })).pipe(
      tap(result => {
        if (result.totalPages > 1) {
          console.warn('More than one page of channels!');
        }
      }),
      map((result: ListResult<ChannelDto>) => result.items),
      switchMap((channelDtos: ChannelDto[]) => {
        return forkJoin(channelDtos.map((channelDto) => {
          return forkJoin(channelDto.users.map(userId => this.userService.getUser(userId)))
            .pipe(
              map(this.usersToTheirChannel(channelDto)),
              tap((channel) => this.localStorageService.storeChannel(channel)),
            );
        }));
      })
    );
  }

  private usersToTheirChannel(channelDto: ChannelDto): (channelUsers: MoonlightUser[]) => MoonlightChannel {
    return (channelUsers: MoonlightUser[]) => {
      const channelUsersProperty: MoonlightUser[] = channelDto.users
        .map((channelUserId: string) => channelUsers.find((user) => user.id === channelUserId))
        .filter((user) => user !== undefined) as MoonlightUser[];

      return {
        id: channelDto.id,
        name: channelDto.name,
        users: channelUsersProperty,
      };
    }
  }
}
