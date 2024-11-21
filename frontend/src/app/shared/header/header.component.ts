import { Router, RouterModule } from '@angular/router';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { User } from 'src/app/layouts/User';
import { Notiffication } from 'src/app/layouts/Notification';

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


  @ViewChild('input_pesquisa') inputElement!: ElementRef;
  currentRoute: any;
  text!: string;

  constructor(private router: Router) {}

  ngOnInit(){
    if(this.user !== null){
      console.log(this.user)
      console.log(this.user.notifications)
      if(this.user.notifications! && this.user.notifications.length > 0){
        this.listNotification = this.user.notifications
      }else{
        this.listNotification = []
      }
    }
  }

  openAndCloseNotifications(){
    this.showNotifications = !this.showNotifications
    if(this.listNotification.length > 0){
      this.listNotification = []
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
