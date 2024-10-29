import { Album } from "./Album";
import { Artist } from "./Artists";
import { Music } from "./Music";

export interface Items {
  musics: Pick<Music, 'id' | 'name' | 'artists' | 'albumName' | 'albumImages'>[];
  albums: Pick<Album, 'id' | 'albumName' | 'albumImage' | 'artists'>[];
  artists: Pick<Artist, 'id' | 'name' | 'artistImages'>[];
}
