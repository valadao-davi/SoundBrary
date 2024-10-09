import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-d-mini',
  templateUrl: './d-mini.component.html',
  styleUrls: ['./d-mini.component.css']
})
export class DMiniComponent {

  constructor(private router: Router){}

  navigateDissay() {
    this.router.navigate(['/dissay']);
  }

}
