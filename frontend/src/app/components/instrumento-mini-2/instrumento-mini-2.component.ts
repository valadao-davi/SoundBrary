import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, Input, ViewChild } from '@angular/core';
import { Instrument } from 'src/app/layouts/Instrument';

@Component({
  selector: 'app-instrumento-mini-2',
  templateUrl: './instrumento-mini-2.component.html',
  styleUrls: ['./instrumento-mini-2.component.css']
})
export class InstrumentoMini2Component {
  @Input() instrumentData!: Instrument;
  @ViewChild(CdkPortal) portal!: CdkPortal

  constructor(private overlay: Overlay){}

  openInstrument(){
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      //width: 60%
      hasBackdrop: true
    })

    const overlayRef = this.overlay.create(config);
    overlayRef.attach(this.portal);
    overlayRef.backdropClick().subscribe(()=> overlayRef.detach())
  }
}
