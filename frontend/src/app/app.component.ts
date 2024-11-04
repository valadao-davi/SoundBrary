import { Component } from '@angular/core';
import { RouteService } from './services/route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private routeService: RouteService) {
  }
  title = 'soundbrary';
}


