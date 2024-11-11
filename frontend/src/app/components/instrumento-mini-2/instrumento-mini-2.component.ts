import { Overlay } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-instrumento-mini-2',
  templateUrl: './instrumento-mini-2.component.html',
  styleUrls: ['./instrumento-mini-2.component.css']
})
export class InstrumentoMini2Component {
  @Input() nameInstrument!: string
  @Input() imgInstrument!: string;
  @ViewChild(CdkPortal) portal!: CdkPortal

  constructor(private overlay: Overlay){}

  openInstrument(){
    const overlayRef = this.overlay.create();
    overlayRef.attach(this.portal);
  }
}
