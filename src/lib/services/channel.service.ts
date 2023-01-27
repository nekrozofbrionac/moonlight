import { Injectable } from '@angular/core';
import { MoonlightChannel, NullMoonlightChannel } from "../types/moonlightChannel";
import { LoginService } from "./login.service";
import { map, Observable, of, tap } from "rxjs";
import { PocketbaseService } from "./internal/pocketbase.service";
import { fromPromise } from "rxjs/internal/observable/innerFrom";
import { Record } from "pocketbase";
import { MoonlightUser } from "../types/moonlightUser";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(
    private readonly loginService: LoginService,
    private readonly pb: PocketbaseService,
  ) {
  }

  public getConversations(): Observable<MoonlightChannel[]> {
    const selfUser = this.loginService.getSelfUser();
    if (selfUser === undefined) {
      return of([NullMoonlightChannel]);
    }
    // some arcane logic using selfUser but not implemented yet

    return fromPromise(this.pb.get.collection('channels').getList(1, 50, {
      filter: `users ~ "${ selfUser.id }"`,
      expand: 'users',
    })).pipe(
      tap(result => {
        if (result.totalPages > 1) {
          console.warn('More than one page of channels!');
        }
      }),
      map((result) => {
        return result.items.map(this.extractChannelFromRecord);
      }),
    );
  }

  private extractChannelFromRecord(item: Record): MoonlightChannel {
    return {
      name: item['name'],
      users: item.expand['users'].map(this.extractUserFromRecord),
    };
  }

  private extractUserFromRecord(item: Record): MoonlightUser {
    return {
      id: item.id,
      username: item['username'],
      name: item['name'],
    };
  }
}
