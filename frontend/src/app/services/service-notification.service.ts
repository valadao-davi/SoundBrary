import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, BehaviorSubject } from 'rxjs';
import { Notiffication } from '../layouts/Notification';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceNotificationService {

  private notificationsSubject = new BehaviorSubject<Notiffication[]>([]);
  public notifications$: Observable<Notiffication[]> = this.notificationsSubject.asObservable();


  private readonly API = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

   getClientNotifications(): Notiffication[]{
    return this.notificationsSubject.getValue()
   }

   setClientNotifications(list: Notiffication[]): void{
    this.notificationsSubject.next(list)
   }

   getUserNotifications(token: string): Observable<Notiffication[]> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<Notiffication[]>(`${this.API}/profile/notifications`, { headers }).pipe(
      catchError((error) => {
        console.error("Erro ao buscar notificações", error);
        return throwError(() => new Error("Erro ao buscar notificações"));
      })
    );
  }

  deleteNotification(token: string, idNotification: string): Observable<Notiffication[]> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete<Notiffication[]>(`${this.API}/profile/deleteNotification/${idNotification}`, { headers }).pipe(
      catchError((error) => {
        console.error("Erro ao deletar a notificação", error);
        return throwError(() => new Error("Erro ao deletar notificação"));
      })
    );
  }


}
