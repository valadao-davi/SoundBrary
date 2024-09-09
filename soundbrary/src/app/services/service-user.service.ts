import { Injectable } from '@angular/core';
import { User } from '../layouts/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {
  private readonly API = 'http://localhost:3000/usuarios'

  constructor(private http: HttpClient) {
   }

   cadastrar(usuario: User): void {
   }

   listUsuarios(): Observable<User[]>{
    return this.http.get<User[]>(this.API)
   }

}
