import { MoonlightUser, NullMoonlightUser } from "./moonlightUser";

export interface MoonlightChannel {
  name: string;
  users: MoonlightUser[];
}

export const NullMoonlightChannel: MoonlightChannel = {
  name: 'Null Channel',
  users: [NullMoonlightUser],
};
