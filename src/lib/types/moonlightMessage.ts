import { MoonlightUser, NullMoonlightUser } from "./moonlightUser";

export interface MoonlightMessage {
  uuid: string;
  timestamp: number;
  author: MoonlightUser;
  content: string;
}

export const NullMoonlightMessage: MoonlightMessage = {
  uuid: '',
  timestamp: 0,
  author: NullMoonlightUser,
  content: 'NullMoonlightMessage',
};
