import { Component } from '@angular/core';
import { DefaultInstrument } from 'src/app/layouts/DefaultInstrument';
import { Instrument } from 'src/app/layouts/Instrument';
import { ServiceInstrumentsImageService } from 'src/app/services/service-instruments-image.service';

@Component({
  selector: 'app-criar-dissay',
  templateUrl: './criar-dissay.component.html',
  styleUrls: ['./criar-dissay.component.css']
})
export class CriarDissayComponent {

  listDefaultInstruments: DefaultInstrument[] = []

  constructor(private serviceDefaultImages: ServiceInstrumentsImageService){}

  ngOnInit(){
    this.listDefaultInstruments = this.serviceDefaultImages.getDefaultInstruments()
  }
  adjustHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto'; // Reseta a altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Define a nova altura
  }
}
