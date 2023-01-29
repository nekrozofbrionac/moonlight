import { MoonlightUser, NullMoonlightUser } from "./moonlightUser";
import { MoonlightChannel, NullMoonlightChannel } from "./moonlightChannel";

export interface MoonlightMessage {
  id: string;
  created: number;
  author: MoonlightUser;
  channel: MoonlightChannel;
  content: string;
}

export const NullMoonlightMessage: MoonlightMessage = {
  id: '',
  created: 0,
  author: NullMoonlightUser,
  channel: NullMoonlightChannel,
  content: 'NullMoonlightMessage',
};
