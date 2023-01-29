import { MoonlightUser, NullMoonlightUser } from "./moonlightUser";

export interface MoonlightChannel {
  id: string;
  name: string;
  users: MoonlightUser[];
}

export const NullMoonlightChannel: MoonlightChannel = {
  id: '',
  name: 'Null Channel',
  users: [NullMoonlightUser],
};
