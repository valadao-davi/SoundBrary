import { Component } from '@angular/core';
import { DefaultInstrument } from 'src/app/layouts/DefaultInstrument';
import { ServiceInstrumentsImageService } from 'src/app/services/service-instruments-image.service';

@Component({
  selector: 'app-add-instrumento',
  templateUrl: './add-instrumento.component.html',
  styleUrls: ['./add-instrumento.component.css']
})
export class AddInstrumentoComponent {
  listDefaultInstruments: DefaultInstrument[] = []

  constructor(private serviceDefaultImages: ServiceInstrumentsImageService){}
  ngOnInit(){
    this.listDefaultInstruments = this.serviceDefaultImages.getDefaultInstruments()
  }
}
