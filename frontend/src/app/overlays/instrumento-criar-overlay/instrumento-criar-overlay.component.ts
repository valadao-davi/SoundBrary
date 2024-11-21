import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DefaultInstrument } from 'src/app/layouts/DefaultInstrument';

@Component({
  selector: 'app-instrumento-criar-overlay',
  templateUrl: './instrumento-criar-overlay.component.html',
  styleUrls: ['./instrumento-criar-overlay.component.css']
})
export class InstrumentoCriarOverlayComponent {
  @Input() instrument!: DefaultInstrument;
  instrumentoForm!: FormGroup;

  saveInstrument(){
    
  }
}
