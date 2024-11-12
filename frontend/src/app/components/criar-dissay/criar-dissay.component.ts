import { Component } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { DefaultInstrument } from 'src/app/layouts/DefaultInstrument';
import { Instrument } from 'src/app/layouts/Instrument';
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
  private searchSubject: Subject<string> = new Subject<string>();
  listDefaultInstruments: DefaultInstrument[] = []

  constructor(private serviceDefaultImages: ServiceInstrumentsImageService, private serviceSpotify: ServiceMusicService){
    this.searchSubject.pipe(debounceTime(1000)).subscribe(value => {
      this.getTracksQuery(value)
    })
  }

  ngOnInit(){
    this.listDefaultInstruments = this.serviceDefaultImages.getDefaultInstruments()
  }

  getTracksQuery(query: string): void {
    if(query){
      this.serviceSpotify.getQueryMusic(query).subscribe(items => {
        this.tracksSearched = items
        console.log(this.tracksSearched)
      })
    }
  }
  onSearchChange(value: string){
    this.searchQuery = value
    this.searchSubject.next(this.searchQuery)
  }
  adjustHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto'; // Reseta a altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Define a nova altura
  }
}
