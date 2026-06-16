import { Component, Input } from '@angular/core';
import { Effect } from 'src/app/layouts/Effect';
import { Instrument } from 'src/app/layouts/Instrument';

@Component({
  selector: 'app-instrumento-overlay',
  templateUrl: './instrumento-overlay.component.html',
  styleUrls: ['./instrumento-overlay.component.css']
})
export class InstrumentoOverlayComponent {
  @Input() instrumentParams!: Instrument;
    listParams!: Effect[];
    nameEffect!: string
    efeito: Effect = {name: '', parameters: {}}


    ngOnInit() {
      const firstEffect = this.instrumentParams.effects ? Object.entries(this.instrumentParams.effects)[0] : null;
      this.listParams = this.instrumentParams.effects
      this.efeito = this.listParams[0]
      }

  loadListParams(effect: Effect){
    this.efeito = effect

  }
}
