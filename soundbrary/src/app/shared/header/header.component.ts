import { Router, RouterModule } from '@angular/router';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { User } from 'src/app/layouts/User';

RouterModule

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() user!: User | null


  @ViewChild('input_pesquisa') inputElement!: ElementRef;
  currentRoute: any;
  text!: string;

  constructor(private router: Router) {}

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
