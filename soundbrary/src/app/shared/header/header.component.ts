import { Router, RouterModule } from '@angular/router';
import { Component, ViewChild, ElementRef } from '@angular/core';

RouterModule

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  @ViewChild('input_pesquisa') inputElement!: ElementRef;

  constructor(private router: Router) {}

  focusInput() {
    this.inputElement.nativeElement.focus();
  }

  pesquisar() {
    this.router.navigate(['/search'])
    console.log("Pesquisa")
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  navigateCadastro() {
    this.router.navigate(['/cadastro']);
  }

  navigateLogin() {
    this.router.navigate(['/login']);
  }
}
