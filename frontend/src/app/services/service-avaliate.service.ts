import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAvaliateService {
  private readonly API = 'http://localhost:3000/avaliations'

  constructor(private http: HttpClient) { }

  avaliateDissay(token: string, dissayId: string, rate: number): Observable<void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.post<void>(`${this.API}/avaliateDissay/${dissayId}`,{rate: rate}, {headers})
  }

  getAvaliationUser(token: string, dissayId: string): Observable<number>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.get<number>(`${this.API}/getAvaliationUser/${dissayId}`, {headers})
  }

  editAvaliationUser(token: string, dissayId: string, rate: number): Observable<void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.put<void>(`${this.API}/editAvaliation/${dissayId}`,{rate: rate}, {headers})
  }
}
