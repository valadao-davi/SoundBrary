import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error'; // Você pode adicionar mais tipos se necessário
}

@Injectable({
  providedIn: 'root'
})
export class AvisosService {
  private notifications: Notification[] = [];
  private notificationSubject = new Subject<Notification | null>();

  getNotification() {
    return this.notificationSubject.asObservable();
  }

  addNotification(notification: Notification) {
    this.notifications.push(notification);
    this.notificationSubject.next(notification);

    setTimeout(() => {
      this.notifications.shift();
      this.notificationSubject.next(this.notifications[0] || null);
    }, 3000); // Tempo que a notificação ficará visível
  }
}
