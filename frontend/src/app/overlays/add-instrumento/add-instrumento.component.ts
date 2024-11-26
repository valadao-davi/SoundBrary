import { Component } from '@angular/core';
import { DefaultInstrument } from 'src/app/layouts/DefaultInstrument';
import { Instrument } from 'src/app/layouts/Instrument';
import { ServiceDissayService } from 'src/app/services/service-dissay.service';
import { ServiceInstrumentsImageService } from 'src/app/services/service-instruments-image.service';

@Component({
  selector: 'app-add-instrumento',
  templateUrl: './add-instrumento.component.html',
  styleUrls: ['./add-instrumento.component.css']
})
export class AddInstrumentoComponent {
  listDefaultInstruments: DefaultInstrument[] = []

  constructor(private serviceDefaultImages: ServiceInstrumentsImageService, private serviceDissay: ServiceDissayService){}
  ngOnInit(){
    this.listDefaultInstruments = this.serviceDefaultImages.getDefaultInstruments()
  }


}
