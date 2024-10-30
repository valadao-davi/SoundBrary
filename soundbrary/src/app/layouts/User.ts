export interface User {
  name: string;
  email: string;
  password: string;
  image?: string;
  _id?: string;
  _dissaySaved?: string[];
  _musicSaved?: string[];
  _albumSaved?: string[];
  _artistsSaved?: string[];
}
