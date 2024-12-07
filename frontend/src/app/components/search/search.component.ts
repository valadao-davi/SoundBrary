import { Component, Input } from '@angular/core';
import { Music } from 'src/app/layouts/Music';
import { ServiceMusicService } from 'src/app/services/service-music.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs';
import { Album } from 'src/app/layouts/Album';
import { Artist } from 'src/app/layouts/Artists';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery!: string;
  private searchSubject: Subject<string> = new Subject<string>();
  tracksSearched!: Music[]
  albumsSearched!: Album[]
  albumsAndSingles!: Album[]
  artistsSearched!: Artist[]
  singleAndEpsSearched!: Album[]
  categoria = "catMusica";
  dataload: boolean = false

  changeMusica() {
    this.dataload = false
    this.categoria = "catMusica"
    this.getTracksQuery(this.searchQuery)
  }
  changeAlbuns() {
        this.dataload = false
    this.categoria = "catAlbuns"
    this.getTracksQuery(this.searchQuery)
  }
  changeSinglesEps() {
        this.dataload = false
    this.categoria = "catSinglesEps"
    this.getTracksQuery(this.searchQuery)
  }
  changeArtistas() {
        this.dataload = false
    this.categoria = "catArtistas"
    this.getTracksQuery(this.searchQuery)
  }
  changeDissays() {
        this.dataload = false
    this.categoria = "catDissays"
    this.getTracksQuery(this.searchQuery)
  }

  constructor(private router: Router, private route: ActivatedRoute, private serviceSpotify: ServiceMusicService){
    this.searchSubject.pipe(debounceTime(1000)).subscribe(value => {
      this.getTracksQuery(value)
    })
  }
  navigateMusic(id: string) {
    this.router.navigate([`/musica/${id}`])
  }
  navigateArtist(id: string) {
    this.router.navigate([`/artista/${id}`])
  }
  navigateAlbum(id: string) {
    this.router.navigate([`/album/${id}`])
  }
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.searchQuery = params['query']
      this.getTracksQuery(this.searchQuery)
    })
  }

  onSearchChange(value: string){
    this.searchQuery = value;
    console.log(this.searchQuery)
    this.searchSubject.next(this.searchQuery)
    this.router.navigate(['/search', this.searchQuery])
  }

  getTracksQuery(query: string): void {
    if(query) {
      switch(this.categoria){
        case 'catMusica':
          this.serviceSpotify.getQueryMusic(query).subscribe(items => {
            this.tracksSearched = items
            this.dataload = true
          });
        break;
        case 'catAlbuns':
          this.serviceSpotify.getQueryAlbum(query).subscribe(items => {
            this.albumsAndSingles = items
            console.log(this.albumsAndSingles)
            this.albumsSearched = this.albumsAndSingles.filter(items => items.albumType === "album")
            this.dataload = true
          });
        break;
        case 'catSinglesEps':
          this.serviceSpotify.getQueryAlbum(query).subscribe(items => {
            this.albumsAndSingles = items
            this.singleAndEpsSearched = this.albumsAndSingles.filter(items => items.albumType !== "album")
            this.dataload = true
          });
        break;
        case 'catArtistas':
          this.serviceSpotify.getQueryArtist(query).subscribe(items => {
            this.artistsSearched = items
            console.log(this.artistsSearched)
            this.dataload = true
          })
      }
    }else {
      this.tracksSearched = []
      this.albumsAndSingles = []
      this.albumsAndSingles = []
    }
  }



}
