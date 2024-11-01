import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-instrumento-mini',
  templateUrl: './instrumento-mini.component.html',
  styleUrls: ['./instrumento-mini.component.css']
})
export class InstrumentoMiniComponent {
  @Input() name!: string;
}
