import { ServiceNotificationService } from 'src/app/services/service-notification.service';
import { ServiceUserService } from 'src/app/services/service-user.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { Notiffication } from 'src/app/layouts/Notification';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { OverlayService } from 'src/app/services/overlay.service';
import { ComponentPortal } from '@angular/cdk/portal';
import { NotificationsComponent } from 'src/app/overlays/notifications/notifications.component';


RouterModule

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  userAuthenticated: boolean = false;
  accessToken!: string;
  showNotifications: boolean = false;
  listNotification: Notiffication[] = []
  dataLoad: boolean = false;

  @ViewChild(CdkPortal) portal!: CdkPortal
  overlayRef!: OverlayRef;

  @ViewChild('input_pesquisa') inputElement!: ElementRef;
  currentRoute: any;
  text!: string;

  constructor(private overlay: Overlay, private overlayRefSerivce: OverlayService, private router: Router, private ServiceUserService: ServiceUserService, private ServiceNotificationService: ServiceNotificationService) {}

  ngOnInit() {
    this.accessToken = localStorage.getItem('token') ?? '';
    if (this.accessToken.length > 0) {
      this.ServiceUserService.getUser(this.accessToken).subscribe({
        next: (i) => {
          if(i.notifications){
            this.ServiceNotificationService.setClientNotifications(i.notifications)
            this.listNotification = this.ServiceNotificationService.getClientNotifications()
          }else{
            this.ServiceNotificationService.setClientNotifications([])
            this.listNotification = this.ServiceNotificationService.getClientNotifications()
          }
          this.userAuthenticated = true;
          this.dataLoad = true;
          this.router.events.subscribe((event)=> {
            if(event instanceof NavigationEnd){
              this.ServiceNotificationService.getUserNotifications(this.accessToken)
              .subscribe({
                next: (itens) => {
                  this.ServiceNotificationService.setClientNotifications(itens)
                  this.listNotification = this.ServiceNotificationService.getClientNotifications()
                }
              })
            }
          })
        },
        error: (error) => {
          if (error.status === 404) {
            this.dataLoad = true;
            this.userAuthenticated = false;
          }
        }
      });
      this.ServiceNotificationService.notifications$.subscribe((notifications) => {
        this.listNotification = notifications;
      });
    } else {
      this.userAuthenticated = false;
      this.dataLoad = true;
    }


  }





  openAndCloseNotifications(event: MouseEvent) {
    const button = event.target as HTMLElement;

    // Sempre recrie o PositionStrategy
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(button)
      .withPositions([
        {
          originX: 'end', // Ponto de origem à direita do botão
          originY: 'bottom', // Origem no final do botão
          overlayX: 'end', // Alinha o início do overlay com a origem à direita
          overlayY: 'top', // Overlay aparece em cima do ponto de origem
          offsetY: 8, // Margem inferior
        },
      ]);

    const config = new OverlayConfig({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'custom-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    // Limpe o OverlayRef sempre que necessário
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }

    this.overlayRef = this.overlay.create(config);

    const portal = new ComponentPortal(NotificationsComponent);
    const componentRef = this.overlayRef.attach(portal);

    componentRef.instance.accessToken = this.accessToken;
    componentRef.instance.closeOverlay = this.closeCard.bind(this);

    this.overlayRef.backdropClick().subscribe(() => this.closeCard());
  }

  closeCard() {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.dispose();
      this.overlayRef = null!;
    } else {
      
    }
  }

  focusInput() {
    this.inputElement.nativeElement.focus();
  }


  isSearchRoute(): boolean {
    return this.router.url.startsWith('/search');
  }

  pesquisar(query: string) {
    this.router.navigate([`/search/${query}`])

    }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  navigateCadastro() {
    this.router.navigate(['/cadastro']);
  }

  navigateLogin(leaving: boolean) {
    if(leaving){
      this.router.navigate(['/login']);
      localStorage.clear()
    }else{
      this.router.navigate(['/login']);
    }
  }
}
