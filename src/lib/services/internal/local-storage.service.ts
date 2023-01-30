import { Injectable } from '@angular/core';
import { MoonlightUser } from "../../types/moonlightUser";
import { MoonlightChannel } from "../../types/moonlightChannel";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly userPrefix = 'user';
  private readonly channelPrefix = 'channel';
  private readonly userListKey = 'userList';
  private readonly channelListKey = 'channelList';

  constructor() {
  }

  storeUser(user: MoonlightUser) {
    localStorage.setItem(`${ this.userPrefix }-${ user.id }`, JSON.stringify(user));
    this.addItemToItemList(this.userListKey, user.id);
  }

  retrieveUser(userId: string): MoonlightUser | undefined {
    const item = localStorage.getItem(`${ this.userPrefix }-${ userId }`);
    if (item === null) {
      return undefined;
    }
    let output: MoonlightUser
    try {
      output = JSON.parse(item);
    } catch (e) {
      return undefined;
    }
    return output;
  }

  storeChannel(channel: MoonlightChannel) {
    localStorage.setItem(`${ this.channelPrefix }-${ channel.id }`, JSON.stringify(channel));
    this.addItemToItemList(this.channelListKey, channel.id);
  }

  retrieveChannel(channelId: string): MoonlightChannel | undefined {
    const item = localStorage.getItem(`${ this.channelPrefix }-${ channelId }`);
    if (item === null) {
      return undefined;
    }
    let output: MoonlightChannel
    try {
      output = JSON.parse(item);
    } catch (e) {
      return undefined;
    }
    return output;
  }

  private addItemToItemList(listKey: string, itemId: string) {
    const storedUserList = this.getStoredItemList(listKey);
    if (storedUserList.includes(itemId)) {
      return;
    }
    storedUserList.push(itemId);
    localStorage.setItem(listKey, JSON.stringify(storedUserList));
  }

  private getStoredItemList(listKey: string): string[] {
    const item = localStorage.getItem(listKey);
    if (item === null) {
      localStorage.setItem(listKey, JSON.stringify([]));
      return [];
    }
    let output: string[]
    try {
      output = JSON.parse(item);
    } catch (e) {
      localStorage.setItem(listKey, JSON.stringify([]));
      return [];
    }
    return output;
  }
}
