import { Injectable } from '@angular/core';
import { MoonlightChannel, NullMoonlightChannel } from "../types/moonlightChannel";
import { LoginService } from "./login.service";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(
    private readonly loginService: LoginService,
  ) {
  }

  public getConversations(): Observable<MoonlightChannel[]> {
    // some arcane logic using selfUser but not implemented yet
    return of([NullMoonlightChannel]);
  }
}
