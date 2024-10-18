import { Injectable } from '@angular/core';
import { User } from '../layouts/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {
  private readonly API = 'http://localhost:3000'
  private userId: String | undefined

  constructor(private http: HttpClient) {}

  setUserId(id: String | undefined) {
    this.userId = id;
  }

  getUserId(): String | undefined {
    return this.userId;
  }

  clearUserId() {
    this.userId = undefined;
  }

  // chama a requisição get para a api no backend
  getUsuariosLista(): Observable<User[]>{
    return this.http.get<User[]>(`${this.API}/users`)
  }
  
  getUser(id: String): Observable<User> {
    return this.http.get<User>(`${this.API}/users/${id}`)
  }
  getUserByEmail(email: String) {
    return this.http.get<User>(`${this.API}/users/email/${email}`)
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.API}/users`, user)
  }

  deleteUser(id: String): Observable<User> {
    console.log('deletado')
    return this.http.delete<User>(`${this.API}/users/${id}`)
  }



}
