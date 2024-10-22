import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceMusicService {
  private readonly API = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getTracksPlaylist(): Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/playlist/playlistTracks/37i9dQZF1DXcBWIGoYBM5M`)
  }

  getMusicById(id: String): Observable<any>{
    return this.http.get<any>(`${this.API}/music/musicId/${id}`)
  }

  getAlbumById(id: String): Observable<any>{
    return this.http.get<any>(`${this.API}/album/idAlbum/${id}`)
  }
}
