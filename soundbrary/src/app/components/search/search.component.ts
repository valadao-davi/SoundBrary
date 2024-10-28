import { Component } from '@angular/core';
import { Music } from 'src/app/layouts/Music';
import { ServiceMusicService } from 'src/app/services/service-music.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery: string = '';
  private searchSubject: Subject<string> = new Subject<string>();
  tracksSearched!: Music[]

  constructor(private serviceSpotify: ServiceMusicService){
    this.searchSubject.pipe(debounceTime(300)).subscribe(value => {
      this.getTracksQuery(value)
    })
  }

  onSearchChange(value: string){
    this.searchQuery = value;
    console.log(this.searchQuery)
    this.searchSubject.next(this.searchQuery)
  }

  getTracksQuery(query: string): void {
    if(query) {
      this.serviceSpotify.getQueryMusic(query).subscribe(items => {
        this.tracksSearched = items
        console.log(this.tracksSearched)
      })
    }else {
      this.tracksSearched = []
    }
  }

  categoria = "catMusica";

  changeMusica() {
    this.categoria = "catMusica"
  }
  changeAlbuns() {
    this.categoria = "catAlbuns"
  }
  changeSinglesEps() {
    this.categoria = "catSinglesEps"
  }
  changeArtistas() {
    this.categoria = "catArtistas"
  }
  changeDissays() {
    this.categoria = "catDissays"
  }

}
