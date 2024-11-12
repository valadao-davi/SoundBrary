import { Component, Input } from '@angular/core';
import { Instrument } from 'src/app/layouts/Instrument';

@Component({
  selector: 'app-instrumento-overlay',
  templateUrl: './instrumento-overlay.component.html',
  styleUrls: ['./instrumento-overlay.component.css']
})
export class InstrumentoOverlayComponent {
  @Input() instrumentParams!: Instrument;
  listParams!: Array<{ [key: string]: string }>;
    nameEffect!: string

    ngOnInit() {
      const firstEffect = this.instrumentParams.effects ? Object.entries(this.instrumentParams.effects)[0] : null;
      console.log(this.instrumentParams.effects)
      console.log(firstEffect)
      if(firstEffect) {
        this.loadListParams({ key: firstEffect[0], value: firstEffect[1] });
      }
    }

  loadListParams(effect: any){
    this.nameEffect = effect.key
    this.listParams = effect.value
    console.log(this.listParams)
  }
}
