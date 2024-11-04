import { Album } from "./Album";
import { Artist } from "./Artists";
import { Image } from "./Image";

export interface Music {
  id: string;
  name: string;
  releaseDate: string;
  artists:  Pick<Artist, 'id' | 'name'>[];
  albumId: Album['id'];
  albumType: Album['albumType'];
  albumName: Album['albumName'];
  orderTrack: number;
  albumImages: Image[];
  externalLink: string;
  duration: number;
}
