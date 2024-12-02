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
  showNotifications: boolean = false;
  listNotification: Notiffication[] = []
  dataLoad: boolean = false;

  @ViewChild(CdkPortal) portal!: CdkPortal
  private overlayRef!: OverlayRef;

  @ViewChild('input_pesquisa') inputElement!: ElementRef;
  currentRoute: any;
  text!: string;

  constructor(private overlay: Overlay, private overlayRefSerivce: OverlayService, private router: Router) {}

  ngOnInit(){
    if(this.user !== null){
      console.log(this.user)
      if(this.user.notifications !== undefined){
        this.listNotification = this.user.notifications
        console.log('aqui')
        this.dataLoad = true
      }else{
        this.listNotification = []
        this.dataLoad = true
      }
      console.log(this.listNotification)
    }
  }

  openAndCloseNotifications(event: MouseEvent) {
    const button = event.target as HTMLElement;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(button)
      .withPositions([
        {
          originX: 'end',        // Ponto de origem à direita do botão
          originY: 'bottom',     // Origem no final do botão
          overlayX: 'end',       // Alinha o início do overlay com a origem à direita
          overlayY: 'top',       // Overlay aparece em cima do ponto de origem
          offsetY: 8,            // Margem inferior
        },
      ]);

    const config = new OverlayConfig({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'custom-backdrop', // Classe para estilizar o backdrop
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create(config);
    } else {
      this.overlayRef.updatePositionStrategy(positionStrategy);
    }

    if (!this.overlayRef.hasAttached()) {
      this.overlayRef.attach(new ComponentPortal(NotificationsComponent));
      this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
    } else {
      this.overlayRef.detach();
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
