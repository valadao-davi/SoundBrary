import { Injectable } from '@angular/core';
import { User } from '../layouts/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {
  private readonly API = 'http://localhost:3000/users'

  constructor(private http: HttpClient) {}

  loginUser(userOrEmail: String, password: string): Observable<{accessToken: string}>{
    return this.http.post<{accessToken: string}>(`${this.API}/login`, {
      userOrEmail,
      password
    });
  }

  getUser(token: String): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.get<User>(`${this.API}/profile`, {headers})
  }

  getUserName(query: string): Observable<User>{
    return this.http.get<User>(`${this.API}/profile/${query}`)
  }

  getUserById(id: string): Observable<string>{
    return this.http.get<string>(`${this.API}/${id}`)
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
    console.log(item)
    return this.http.patch<void>(`${this.API}/addToFavorites/songs`, {id: item}, {headers}).pipe(
      catchError((erro)=> {
        console.error("Ocorreu um erro ao salvar as musicas, ", erro)
        return throwError(()=> new Error("Erro ao salvar músicas nos favoritos. tente novamente"))
      })
    )
  }

  removeSongFavorites(token: string, item: string): Observable<void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.patch<void>(`${this.API}/removeFavorites/songs`, {id: item}, {headers}).pipe(
      catchError((erro)=> {
        console.error("Ocorreu um erro ao remover as musicas, ", erro)
        return throwError(()=> new Error("Erro ao remover músicas nos favoritos. tente novamente"))
      })
    )
  }


  saveAlbumToFavorite(token: string, item: string): Observable<void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    console.log(item)
    return this.http.patch<void>(`${this.API}/addToFavorites/albums`, {id: item}, {headers}).pipe(
      catchError((erro)=> {
        console.error("Ocorreu um erro ao salvar os albums, ", erro)
        return throwError(()=> new Error("Erro ao salvar albuns. tente novamente"))
      })
    )
  }

  removeAlbumFavorites(token: string, item: string): Observable<void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.patch<void>(`${this.API}/removeFavorites/albums`, {id: item}, {headers}).pipe(
      catchError((erro)=> {
        console.error("Ocorreu um erro ao remover os albums, ", erro)
        return throwError(()=> new Error("Erro ao remover albuns. tente novamente"))
      })
    )
  }

  saveArtistsToFavorite(token: string, item: string): Observable<void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    console.log(item)
    return this.http.patch<void>(`${this.API}/addToFavorites/artists`, {id: item}, {headers}).pipe(
      catchError((erro)=> {
        console.error("Ocorreu um erro ao salvar o artista, ", erro)
        return throwError(()=> new Error("Erro ao salvar artista. tente novamente"))
      })
    )
  }
  removeArtistsFavorites(token: string, item: string): Observable<void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    console.log(item)
    return this.http.patch<void>(`${this.API}/addToFavorites/artists`, {id: item}, {headers}).pipe(
      catchError((erro)=> {
        console.error("Ocorreu um erro ao remover o artista, ", erro)
        return throwError(()=> new Error("Erro ao remover artista. tente novamente"))
      })
    )
  }


}
