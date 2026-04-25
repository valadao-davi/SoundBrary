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
  page = 0;
  limit = 20;

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
    if (!query) return;

    const offset = this.page * this.limit;

    switch (this.categoria) {

      case 'catMusica':
        this.serviceSpotify.getQueryMusic(query, this.limit, offset)
          .subscribe(items => {
            this.tracksSearched = items;
            this.dataload = true;
          });
        break;

      case 'catAlbuns':
        this.serviceSpotify.getQueryAlbum(query, this.limit, offset)
          .subscribe(items => {
            this.albumsAndSingles = items;
            this.albumsSearched = items.filter(i => i.albumType === "album");
            this.dataload = true;
          });
        break;

      case 'catSinglesEps':
        this.serviceSpotify.getQueryAlbum(query, this.limit, offset)
          .subscribe(items => {
            this.albumsAndSingles = items;
            this.singleAndEpsSearched = items.filter(i => i.albumType !== "album");
            this.dataload = true;
          });
        break;

      case 'catArtistas':
        this.serviceSpotify.getQueryArtist(query, this.limit, offset)
          .subscribe(items => {
            this.artistsSearched = items;
            this.dataload = true;
          });
        break;
    }
  }

  nextPage() {
    this.page++;
    this.getTracksQuery(this.searchQuery);
    window.scrollTo(0, 0);
    this.dataload = false
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.getTracksQuery(this.searchQuery);
    }
  }


}
