import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coment } from '../layouts/Comment';


@Injectable({
  providedIn: 'root'
})
export class ServiceCommentService {
  private readonly API = 'http://localhost:3000/comments'

  constructor(private http: HttpClient) { }

  postComment(token: string, id: string, content: string): Observable<Coment>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.post<Coment>(`${this.API}/commentDissay/${id}`,{text: content}, {headers})
  }

  awnserComment(token: string, idParent: string, content: string, idResposta?: string):  Observable<Coment>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.post<Coment>(`${this.API}/awnserDissay/${idParent}`,{text: content, idAwnser: idResposta ?? null},  {headers})
  }

  deleteComment(token: string, idComment: string): Observable<void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.delete<void>(`${this.API}/deleteComment/${idComment}`,{headers})
  }
}
