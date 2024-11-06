import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dissay } from '../layouts/Dissay';

@Injectable({
  providedIn: 'root'
})
export class ServiceDissayService {
  private readonly API = 'http://localhost:3000/dissays'

  constructor(private http: HttpClient) { }

  getAllDissays(): Observable<Dissay[]>{
    return this.http.get<Dissay[]>(`${this.API}`)
  }

  getDissayByMusic(idMusic: string): Observable<Dissay[]>{
    return this.http.get<Dissay[]>(`${this.API}/getDissayByMusic/${idMusic}`)
  }

  getDissayById(id: string): Observable<Dissay>{
    return this.http.get<Dissay>(`${this.API}/getDissay/${id}`)
  }
}
