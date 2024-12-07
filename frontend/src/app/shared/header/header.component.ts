import { Router, RouterModule } from '@angular/router';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { User } from 'src/app/layouts/User';
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
  @Input() user!: User | null
  @Input() accessToken!: string;
  showNotifications: boolean = false;
  listNotification: Notiffication[] = []
  dataLoad: boolean = false;

  @ViewChild(CdkPortal) portal!: CdkPortal
  overlayRef!: OverlayRef;

  @ViewChild('input_pesquisa') inputElement!: ElementRef;
  currentRoute: any;
  text!: string;

  constructor(private overlay: Overlay, private overlayRefSerivce: OverlayService, private router: Router) {}

  ngOnInit(){
    if(this.user !== null){
      if(this.user.notifications !== undefined){

        this.listNotification = this.user.notifications
        this.dataLoad = true
      }else{
        this.listNotification = []
        this.dataLoad = true
      }
      console.log(this.listNotification)
    }else{
      this.dataLoad = true
    }
  }

  openAndCloseNotifications(event: MouseEvent) {
    const button = event.target as HTMLElement;

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

    // Verifique se o overlay já está criado e aberto
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create(config);
    } else if (this.overlayRef.hasAttached()) {
      // Se já estiver anexado, desanexamos e fechamos
      this.closeCard();
      return;
    }

    if (!this.overlayRef.hasAttached()) {
      const portal = new ComponentPortal(NotificationsComponent);
      const componentRef = this.overlayRef.attach(portal);
      componentRef.instance.accessToken = this.accessToken;
      componentRef.instance.closeOverlay = this.closeCard.bind(this)

      // Fecha o overlay ao clicar no backdrop
      this.overlayRef.backdropClick().subscribe(() => this.closeCard());
    }
  }
  closeCard() {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    } else {
      console.log('Overlay not defined');
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

    console.log("Pesquisa")
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
