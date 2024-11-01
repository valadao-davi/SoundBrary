export interface User {
  userName: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  _id?: string;
  dissaySaved?: string[];
  musicSaved?: string[];
  albumSaved?: string[];
  artistsSaved?: string[];
  dissaysCreated?: string[];

}
