import { Component, Input } from '@angular/core';
import { Music } from 'src/app/layouts/Music';
import { ServiceMusicService } from 'src/app/services/service-music.service';
import { forkJoin, Subject } from 'rxjs';
import { debounceTime } from 'rxjs';
import { Album } from 'src/app/layouts/Album';
import { Artist } from 'src/app/layouts/Artists';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Dissay } from 'src/app/layouts/Dissay';
import { ServiceDissayService } from 'src/app/services/service-dissay.service';
import { ServiceUserService } from 'src/app/services/service-user.service';

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
  DissaysSearched!: Dissay[]
  MusicIdDissays!: string[]
  MusicDissaySearched!: Music[]
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

  constructor(private router: Router, private route: ActivatedRoute, private serviceSpotify: ServiceMusicService, private serviceDissay: ServiceDissayService, private serviceUser: ServiceUserService){
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
  navigateDissay(id: string) {
    this.router.navigate([`/dissay/${id}`])
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
        break;
        case 'catDissays':
          this.serviceDissay.searchDissays(query).subscribe(items => {
            this.DissaysSearched = items
            this.MusicIdDissays = this.DissaysSearched.map(i => {
              return i.musicId
            })
            this.dataload = true
            const images = this.MusicIdDissays.map(i => 
              this.serviceSpotify.getMusicById(i)
            )
            forkJoin(images).subscribe(
              (results) => {
                this.MusicDissaySearched = results
              }
            )
          })
          break;
      }
    }else {
      this.tracksSearched = []
      this.albumsAndSingles = []
      this.albumsAndSingles = []
      this.DissaysSearched = []
    }
  }



}
