import { Injectable } from '@angular/core';
import { MoonlightUser } from "../types/moonlightUser";
import { PocketbaseService } from "./internal/pocketbase.service";
import { map, Observable, tap } from "rxjs";
import { fromPromise } from "rxjs/internal/observable/innerFrom";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private readonly pb: PocketbaseService,
  ) {
  }

  public loggedIn(): boolean {
    return this.pb.get.authStore.isValid;
  }

  public login(username: string, password: string): Observable<boolean> {
    return fromPromise(this.pb.get.collection('users').authWithPassword(username, password))
      .pipe(
        tap((result) => this.pb.get.authStore.save(result.token, result.record)),
        map((result) => result.token !== null),
      );
  }

  public getSelfUser(): MoonlightUser | undefined {
    if (this.pb.get.authStore.model === null) {
      return undefined;
    }
    const record = this.pb.get.authStore.model;
    return {
      id: record.id,
      username: record['username'],
      name: record['name'],
    };
  }
}
