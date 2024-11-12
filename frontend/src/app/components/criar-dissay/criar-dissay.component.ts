import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, ViewChild, AfterViewInit, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { DefaultInstrument } from 'src/app/layouts/DefaultInstrument';
import { Music } from 'src/app/layouts/Music';
import { ServiceInstrumentsImageService } from 'src/app/services/service-instruments-image.service';
import { ServiceMusicService } from 'src/app/services/service-music.service';

@Component({
  selector: 'app-criar-dissay',
  templateUrl: './criar-dissay.component.html',
  styleUrls: ['./criar-dissay.component.css']
})
export class CriarDissayComponent implements AfterViewInit, OnDestroy {
  @ViewChild('inputElement') inputElement!: ElementRef;
  @ViewChild('searchOverlayComponent') searchOverlayComponent!: TemplateRef<any>;
  
  searchQuery!: string;
  tracksSearched!: Music[]
  private searchSubject: Subject<string> = new Subject<string>();
  overlayRef!: OverlayRef;

  constructor(private overlay: Overlay,private serviceDefaultImages: ServiceInstrumentsImageService, private serviceSpotify: ServiceMusicService, private viewContainerRef: ViewContainerRef){
    this.searchSubject.pipe(debounceTime(1000)).subscribe(value => {
      this.getTracksQuery(value)
    })
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  listDefaultInstruments: DefaultInstrument[] = [];
  maxLengthTitle: number = 100        // Limite para o título
  maxLengthDescription: number = 1000; // Limite para a descrição
  charCountTitle: number = 0;          // Contador para o título
  charCountDescription: number = 0;    // Contador para a descrição

  titleValue: string = '';
  descriptionValue: string = '';


  ngOnInit() {
    this.listDefaultInstruments = this.serviceDefaultImages.getDefaultInstruments();
  }

  getTracksQuery(query: string): void {
    if(query){
      this.serviceSpotify.getQueryMusic(query).subscribe(items => {
        this.tracksSearched = items
        console.log(this.tracksSearched)
      })
    }
  }
  onSearchChange(value: string) {
    this.searchQuery = value;
    this.searchSubject.next(this.searchQuery);

    if (value && !this.overlayRef) {
      this.openOverlay();
    } else if (!value && this.overlayRef) {
      this.closeOverlay();
    } else if (value && this.overlayRef) {
      this.closeOverlay();
      this.openOverlay();
    }
  }

  ngOnDestroy() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

  openOverlay(){
    const positionStrategy = this.overlay.position()
    .flexibleConnectedTo(this.inputElement)
    .withPositions([
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      }
    ])

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: false
    })

    this.overlayRef.attach(new TemplatePortal(this.searchOverlayComponent, this.viewContainerRef));

    this.overlayRef.backdropClick().subscribe(() => this.closeOverlay());
  }

  closeOverlay() {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  // Ajusta dinamicamente a altura do textarea conforme o conteúdo
  adjustHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';  // Reseta a altura para o valor 'auto' antes de recalcular
    textarea.style.height = `${textarea.scrollHeight}px`;  // Ajusta a altura conforme o conteúdo
  }

  // Função para atualizar os contadores e verificar o limite
  onInput(event: Event, type: string): void {
    
    const target = event.target as HTMLTextAreaElement | HTMLInputElement;
    if (target) {
      if (type === 'title') {
        this.charCountTitle = target.value.length;
        this.titleValue = target.value;
      } else if (type === 'description') {
        this.charCountDescription = target.value.length;
        this.descriptionValue = target.value;
      }
    }
  }
}
