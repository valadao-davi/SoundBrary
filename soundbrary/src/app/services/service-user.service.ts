import { Injectable } from '@angular/core';
import { User } from '../layouts/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {
  private readonly API = 'http://localhost:3000/users'

  constructor(private http: HttpClient) {}

  loginUser(email: String, password: string): Observable<{accessToken: string}>{
    return this.http.post<{accessToken: string}>(`${this.API}/login`, {
      email,
      password
    });
  }

  getUser(token: String): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.get<User>(`${this.API}/profile`, {headers})
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.API}/createUser`, user)
  }

  deleteUser(id: String): Observable<User> {
    console.log('deletado')
    return this.http.delete<User>(`${this.API}/${id}`)
  }

  saveSongToFavorite(token: string, item: string): Observable<void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.patch<void>(`${this.API}/addToFavorites/songs`, {id: item}, {headers})
  }

  removeSongFavorites(token: string, item: string): Observable<void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.patch<void>(`${this.API}/removeFavorites/songs`, {id: item}, {headers})
  }
  saveArtistsToFavorite(token: string, item: string): Observable<void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.patch<void>(`${this.API}/addToFavorites/artists`, {id: item}, {headers})
  }

  removeArtistsFavorites(token: string, item: string): Observable<void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.patch<void>(`${this.API}/removeFavorites/artists`, {id: item}, {headers})
  }
  saveAlbumToFavorite(token: string, item: string): Observable<void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.patch<void>(`${this.API}/addToFavorites/albums`, {id: item}, {headers})
  }

  removeAlbumFavorites(token: string, item: string): Observable<void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.patch<void>(`${this.API}/removeFavorites/albums`, {id: item}, {headers})
  }



}
