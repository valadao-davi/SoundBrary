import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
RouterModule

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  constructor(private router: Router) {}

  navigateHome() {
    this.router.navigate(['/home']);
  }
}
