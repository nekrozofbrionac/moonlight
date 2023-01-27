import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class PocketbaseService {

  private pb: PocketBase = new PocketBase(environment.pocketBaseLink);

  constructor() { }

  public get get(): PocketBase {
    return this.pb;
  }
}
