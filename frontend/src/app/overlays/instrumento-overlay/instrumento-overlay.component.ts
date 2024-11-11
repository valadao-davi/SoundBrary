import { Component, Input } from '@angular/core';
import { Instrument } from 'src/app/layouts/Instrument';

@Component({
  selector: 'app-instrumento-overlay',
  templateUrl: './instrumento-overlay.component.html',
  styleUrls: ['./instrumento-overlay.component.css']
})
export class InstrumentoOverlayComponent {
  @Input() instrumentParams!: Instrument;
}
