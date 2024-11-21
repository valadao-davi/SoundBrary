import { Component, ElementRef, ViewChild, AfterViewInit, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DefaultInstrument } from 'src/app/layouts/DefaultInstrument';
import { Music } from 'src/app/layouts/Music';
import { ServiceInstrumentsImageService } from 'src/app/services/service-instruments-image.service';
import { ServiceMusicService } from 'src/app/services/service-music.service';

@Component({
  selector: 'app-criar-dissay',
  templateUrl: './criar-dissay.component.html',
  styleUrls: ['./criar-dissay.component.css']
})
export class CriarDissayComponent {
  @ViewChild('inputElement') inputElement!: ElementRef;
  @ViewChild('searchOverlayComponent') searchOverlayComponent!: TemplateRef<any>;
  
  searchQuery!: string;
  tracksSearched!: Music[]
  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private serviceDefaultImages: ServiceInstrumentsImageService, private serviceSpotify: ServiceMusicService){
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

  adjustHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';  
    textarea.style.height = `${textarea.scrollHeight}px`;  
  }

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
