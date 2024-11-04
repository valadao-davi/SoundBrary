import { Artist } from "./Artists";
import { Image } from "./Image";
import { Music } from "./Music";

export interface Album {
  id: string;
  albumType: string;
  albumName: string;
  releaseDate: string;
  externalLink: string;
  albumImage: Image[];
  artists: Pick<Artist, 'id' | 'name'>[];
  tracks: Pick<Music, 'id' | 'name' | 'orderTrack' | 'duration'>[];
}
