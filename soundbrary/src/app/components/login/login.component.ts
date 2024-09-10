import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) {}

  navigateCadastro() {
    this.router.navigate(['/cadastro']);
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }
}
