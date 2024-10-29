import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Music } from '../layouts/Music';
import { Album } from '../layouts/Album';
import { Artist } from '../layouts/Artists';
import { Items } from '../layouts/Items';

@Injectable({
  providedIn: 'root'
})
export class ServiceMusicService {
  private readonly API = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getTracksPlaylist(): Observable<Music[]>{
    return this.http.get<Music[]>(`${this.API}/playlist/playlistTracks/37i9dQZF1DXcBWIGoYBM5M`)
  }

  getMusicById(id: String): Observable<Music>{
    return this.http.get<Music>(`${this.API}/music/musicId/${id}`)
  }

  getAlbumById(id: String): Observable<Album>{
    return this.http.get<Album>(`${this.API}/album/idAlbum/${id}`)
  }

  getArtistById(id: string): Observable<Artist>{
    return this.http.get<Artist>(`${this.API}/artists/idArtist/${id}`)
  }

  getAlbumsByArtist(id: string): Observable<Album[]>{
    return this.http.get<Album[]>(`${this.API}/artists/idArtist/album/${id}`)
  }

  getQueryMusic(query: string): Observable<Music[]>{
    return this.http.get<Music[]>(`${this.API}/music/searchMusic/${query}`)
  }
  getQueryAlbum(query: string): Observable<Album[]>{
    return this.http.get<Album[]>(`${this.API}/album/searchAlbum/${query}`)
  }
  getQueryArtist(query: string): Observable<Artist[]>{
    return this.http.get<Artist[]>(`${this.API}/artists/searchArtist/${query}`)
  }
  getQueryGeneral(query: string): Observable<Items>{
    return this.http.get<Items>(`${this.API}/allSearch/${query}`)
  }
}
