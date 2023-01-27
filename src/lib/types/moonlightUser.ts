export interface MoonlightUser {
  id: string;
  username: string;
  name: string;
}

export const NullMoonlightUser: MoonlightUser = {
  id: '0',
  username: 'Null User',
  name: 'Null User',
};
