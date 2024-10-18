import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-m-mini',
  templateUrl: './m-mini.component.html',
  styleUrls: ['./m-mini.component.css']
})
export class MMiniComponent {
  @Input() name!: string;
  @Input() imageUrl!: string;
  @Input() artistName!: string;


}
