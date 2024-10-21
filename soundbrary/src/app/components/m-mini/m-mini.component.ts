import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-m-mini',
  templateUrl: './m-mini.component.html',
  styleUrls: ['./m-mini.component.css']
})
export class MMiniComponent {

  constructor(private router: Router) {}

  navigateMusic(id: string) {
    
    this.router.navigate([`/musica/${id}`])
  }

  @Input() name!: string;
  @Input() imageUrl!: string;
  @Input() artistName!: string;
  @Input() id!: string;

}
