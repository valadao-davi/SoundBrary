import { Injectable, signal } from '@angular/core';
import { User } from '../layouts/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {
  private readonly API = 'http://localhost:3000'
  // private usersSubject = new Observable<User[]>;
  // private userSubject = new Observable<User>({})

  constructor(private http: HttpClient) {}

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

  // getUsers() {
  //   this.refreshUsers();
  //   return this.users$();
  // }

  // getUser(id: string){
  //     this.http.get<User>(`${this.API}/users/${id}`)
  //     .subscribe(user => {
  //       this.user$.set(user)
  //       return this.user$;
  //     })
  // }

  // cadastrar(usuario: User) {
  //   this.http.post<User>(`${this.API}/users`, usuario, { responseType: 'json' })
  // }

  // atualizarUsuario(id: string, usuario: User) {
  //   return this.http.put(`${this.API}/users/${id}`, usuario, { responseType: 'text' })
  // }

  // deletarUsuario(id: string) {
  //   return this.http.delete(`${this.API}/users/${id}`, { responseType: 'text'})
  // }

}
