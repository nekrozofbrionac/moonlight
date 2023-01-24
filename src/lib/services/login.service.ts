import { Injectable } from '@angular/core';
import { MoonlightUser, NullMoonlightUser } from "../types/moonlightUser";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private selfUser: MoonlightUser = NullMoonlightUser;

  constructor() { }

  public getSelfUser(): MoonlightUser {
    return this.selfUser;
  }
}
