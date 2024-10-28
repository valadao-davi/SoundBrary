import { Image } from "./Image";

export interface Artist {
  id: string;
  name: string;
  artistFollowers: number;
  artistImages: Image[];
  externalLink: string;
  genres: string[];
}
