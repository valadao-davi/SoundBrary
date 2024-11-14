import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
export class CriarDissayComponent {
 
  searchQuery!: string;
  tracksSearched!: Music[]
  idParam!: string;
  showResults: boolean = false;
  @Input() musicSelected!: Music;
  private searchSubject: Subject<string> = new Subject<string>();
  listDefaultInstruments: DefaultInstrument[] = []
  maxLengthTitle: number = 100;
  maxLengthDescription: number = 1000;
  charCountTitle: number = 0;
  charCountDescription: number = 0;
  titleValue: string = '';
  descriptionValue: string = '';

  constructor(private serviceDefaultImages: ServiceInstrumentsImageService, private serviceSpotify: ServiceMusicService, private route: ActivatedRoute){
    this.searchSubject.pipe(debounceTime(500)).subscribe(value => {
      this.getTracksQuery(value)
    })

  }

  ngOnInit(){
    this.listDefaultInstruments = this.serviceDefaultImages.getDefaultInstruments()
    this.route.queryParams.subscribe(params => {
      if(params['value']){
        this.serviceSpotify.getMusicById(params['value']).subscribe(music => {
          this.musicSelected = music
        })
      }else{
        console.log("No value")
      }
    })
  }

  getTracksQuery(query: string): void {
    if(query){
      this.serviceSpotify.getQueryMusic(query).subscribe(items => {
        this.tracksSearched = items
        this.showResults = items.length > 0
      })
    }else{
      this.tracksSearched = []
      this.showResults = false
    }
  }
  selectMusic(id: string){
    if(this.tracksSearched){
      const foundTrack = this.tracksSearched.find(track => track.id === id)
      if(foundTrack){
        this.musicSelected = foundTrack
        this.showResults = false
      }
    }
  }
  onSearchChange(value: string) {
    this.searchQuery = value;
    this.searchSubject.next(this.searchQuery);

   
  }

  onInput(event: Event, type: string): void {
    const target = event.target as HTMLTextAreaElement | HTMLInputElement
    if(target){
      if(type === 'title'){
        this.charCountTitle = target.value.length
        this.titleValue = target.value
      }else if(type === 'description'){
        this.charCountDescription = target.value.length
        this.descriptionValue = target.value
    }
  }
  }
  // Ajusta dinamicamente a altura do textarea conforme o conteúdo
  adjustHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto'; // Reseta a altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Define a nova altura
  }

  getTrackById(id: string){
    this.serviceSpotify.getMusicById(id).subscribe(music => {
      this.musicSelected = music
    })
  }
}
