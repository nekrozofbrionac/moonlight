import { Injectable } from '@angular/core';
import { MoonlightMessage } from "../types/moonlightMessage";
import { Observable, of } from "rxjs";
import { MoonlightChannel } from "../types/moonlightChannel";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private mockMap: Map<MoonlightChannel, MoonlightMessage[]> = new Map<MoonlightChannel, MoonlightMessage[]>();

  constructor() { }

  send(target: MoonlightChannel, message: MoonlightMessage): Observable<boolean>{
    if (!this.mockMap.has(target)) {
      this.mockMap.set(target, [{
        uuid: 'sjfdlkjhsdflkg',
        timestamp: Date.now(),
        author: {
          id: '',
          username: "Test User 2",
          name: "Test User 2",
        },
        content: "Hello, World!",
      }]);
    }
    this.mockMap.set(target, [message, ...(this.mockMap.get(target) as MoonlightMessage[])]);
    return of(true);
  }

  receiveLog(target: MoonlightChannel, until: number = 50, from: number = 0): Observable<MoonlightMessage[]> {
    return of(this.mockMap.get(target) ?? []);
  }
}
