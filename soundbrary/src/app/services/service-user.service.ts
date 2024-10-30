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

  loginUser(email: String, password: string): Observable<{accesToken: string}>{
    return this.http.post<{accesToken: string}>(`${this.API}/login`, {
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




}
