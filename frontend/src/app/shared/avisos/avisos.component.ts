import { Component, OnInit } from '@angular/core';
import { AvisosService } from 'src/app/services/avisos.service';
AvisosService

@Component({
  selector: 'app-notification',
  template: `
    <div *ngIf="notification" [ngClass]="{'slide1': notification.type === 'success', 'slide2': notification.type === 'error'}" class="notification">
      {{ notification.message }}
    </div>
  `,
  styles: [`
    .notification {
      position: fixed;
      bottom: -50px; /* Fora da tela inicialmente */
      left: 50%;
      transform: translateX(-50%);
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      transition: bottom 0.5s ease;
      z-index: 1000;
    }
    .slide1 {
      background-color: #4CAF50; /* Verde para sucesso */
    }
    .slide2 {
      background-color: #f44336; /* Vermelho para erro */
    }
  `]
})
export class NotificationComponent implements OnInit {
  notification: Notification | null = null;

  constructor(private avisosService: AvisosService) {}

  ngOnInit() {
    this.avisosService.getNotification().subscribe(notification => {
      this.notification = notification;
      if (notification) {
        this.showNotification();
      }
    });
  }

  showNotification() {
    // Aqui você pode implementar lógica adicional se necessário
  }
}
