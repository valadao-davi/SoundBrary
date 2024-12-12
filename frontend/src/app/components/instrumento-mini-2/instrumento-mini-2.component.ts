import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, Input, ViewChild } from '@angular/core';
import { DefaultInstrument } from 'src/app/layouts/DefaultInstrument';
import { Instrument } from 'src/app/layouts/Instrument';
import { OverlayService } from 'src/app/services/overlay.service';
import { ServiceDissayService } from 'src/app/services/service-dissay.service';

@Component({
  selector: 'app-instrumento-mini-2',
  templateUrl: './instrumento-mini-2.component.html',
  styleUrls: ['./instrumento-mini-2.component.css']
})
export class InstrumentoMini2Component {
  @Input() instrumentData!: Instrument;
  @Input() instrumentDefault!: DefaultInstrument;
  @ViewChild(CdkPortal) portal!: CdkPortal
  listDissayInstruments: Instrument[] = []
  @Input() nomeAfinacao!: string;
  @Input() nomeBigAfinacao!: string;
  @Input() toneDissay!: string;
  


  constructor(private overlay: Overlay, private serviceDissay: ServiceDissayService, private overlayRefSerivce: OverlayService){}

  ngOnInit(){
    this.listDissayInstruments = this.serviceDissay.getInstruments()

  }

  openInstrument(){
    this.verifyInstrument()
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      //width: 60%
      hasBackdrop: true
    })

    const overlayRef = this.overlay.create(config);
    overlayRef.attach(this.portal);
    overlayRef.backdropClick().subscribe(()=> overlayRef.detach())
  }
  verifyInstrument(){
    if(this.instrumentDefault){
      const findInstrumentIndex = this.listDissayInstruments.findIndex(i => i.defaultInstrument.nameInstrument === this.instrumentDefault.nameInstrument)
      if(findInstrumentIndex !== -1){
        let newInstrumentName = this.instrumentDefault.nameInstrument;
        let counter = 2;
        while (this.listDissayInstruments.some(i => i.defaultInstrument.nameInstrument === newInstrumentName)) {
          newInstrumentName = `${this.instrumentDefault.nameInstrument} ${counter}`;
          counter++;
        }
        
        this.instrumentDefault = { ...this.instrumentDefault, nameInstrument: newInstrumentName };
      }
    }
  }

  setAfinacao(nomeAfinacao: string) {
    console.log("funcionando")
    this.serviceDissay.setTone(nomeAfinacao)
    console.log(this.serviceDissay.getTone())
    this.overlayRefSerivce.closeAllOverlays()

  }
}
