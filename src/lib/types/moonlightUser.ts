export interface MoonlightUser {
  id: number;
  name: string;
}

export const NullMoonlightUser: MoonlightUser = {
  id: 0,
  name: 'Null User',
};
