import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-left-info',
  templateUrl: './left-info.component.html',
  styleUrls: ['./left-info.component.css']
})
export class LeftInfoComponent {
  @Input() urlImage!: string;
}
