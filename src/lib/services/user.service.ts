import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { MoonlightUser } from "../types/moonlightUser";
import { PocketbaseService } from "./internal/pocketbase.service";
import { UserDto } from "./internal/dto/user-dto";
import { fromPromise } from "rxjs/internal/observable/innerFrom";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly pb: PocketbaseService,
  ) {
  }

  public getUser(userId: string): Observable<MoonlightUser> {
    return fromPromise(this.pb.get.collection('users').getOne<UserDto>(userId))
      .pipe(
        map((userDto) => {
          const output: MoonlightUser = {
            id: userDto.id,
            name: userDto.name,
            username: userDto.username,
          }
          return output;
        })
      );
  }
}

