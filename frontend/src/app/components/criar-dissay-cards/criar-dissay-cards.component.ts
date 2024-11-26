import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, Input, ViewChild } from '@angular/core';
import { DefaultInstrument } from 'src/app/layouts/DefaultInstrument';
import { Instrument } from 'src/app/layouts/Instrument';

@Component({
  selector: 'app-criar-dissay-cards',
  templateUrl: './criar-dissay-cards.component.html',
  styleUrls: ['./criar-dissay-cards.component.css']
})
export class CriarDissayCardsComponent {
  @Input() instrumento!: DefaultInstrument
  @Input() afinacao!: string
  @ViewChild(CdkPortal) portal!: CdkPortal;

  constructor(private overlay: Overlay){}

  openInstrument(){
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true
    })

    const overlayRef = this.overlay.create(config);
    overlayRef.attach(this.portal);
    overlayRef.backdropClick().subscribe(()=> overlayRef.detach())
  }

    
}
