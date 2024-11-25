import { OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  private overlayRefs: OverlayRef[] = []

  addOverlay(overlayRef: OverlayRef): void{
    this.overlayRefs.push(overlayRef)
  }

  closeAllOverlays(): void{
    console.log(this.overlayRefs)
    this.overlayRefs.forEach((ref)=> ref.dispose())
    this.overlayRefs = []
  }
}
