import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class AuthLayoutComponent {

  constructor (private router: Router){}
  navigateHome() {
    this.router.navigate(['/home']);
  }
}
