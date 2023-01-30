import { Injectable } from '@angular/core';
import { map, Observable, of } from "rxjs";
import { MoonlightUser } from "../types/moonlightUser";
import { PocketbaseService } from "./internal/pocketbase.service";
import { UserDto } from "./internal/dto/user-dto";
import { fromPromise } from "rxjs/internal/observable/innerFrom";
import { LocalStorageService } from "./internal/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly pb: PocketbaseService,
    private readonly localStorageService: LocalStorageService,
  ) {
  }

  public getUser(userId: string): Observable<MoonlightUser> {
    const cachedUser = this.localStorageService.retrieveUser(userId);
    if (cachedUser !== undefined) {
      return of(cachedUser);
    }
    return fromPromise(this.pb.get.collection('users').getOne<UserDto>(userId))
      .pipe(
        map((userDto) => {
          const output: MoonlightUser = {
            id: userDto.id,
            name: userDto.name,
            username: userDto.username,
          }
          this.localStorageService.storeUser(output);
          return output;
        })
      );
  }
}

