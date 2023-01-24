import { MoonlightUser } from "./moonlightUser";

export interface MoonlightChannel {
  users: MoonlightUser[];
}

export const NullMoonlightChannel: MoonlightChannel = {
  users: [],
};
