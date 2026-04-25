import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Album } from 'src/app/layouts/Album';
import { Artist } from 'src/app/layouts/Artists';
import { User } from 'src/app/layouts/User';
import { ServiceMusicService } from 'src/app/services/service-music.service';
import { ServiceUserService } from 'src/app/services/service-user.service';


@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent {
  artistItem?: Artist;
  albumItems:Album[] = [];
  singleItems: Album[] = [];
  dataLoaded: boolean = false
  itemsAlbum: Album[] = [];
  accessToken!: string
  saved: boolean = false;
  user?: User;
  userAuthenticated: boolean = false;
  page: number = 0;
  limit: number = 5;
  hasMore: boolean = true;
  pageAlbums: number = 0;
  pageSingles: number = 0;
  hasMoreAlbums: boolean = true;
  hasMoreSingles: boolean = true;

  

  id!: string | null;
  constructor(private router: Router,private route: ActivatedRoute, private serviceSpotify: ServiceMusicService, private serviceUser: ServiceUserService){

  }
  navigateAlbum(id: string) {
    this.router.navigate([`/album/${id}`])
  }

  ngOnInit(){
    this.dataLoaded = false;
    this.accessToken = localStorage.getItem('token') ?? ""
    this.accessToken = localStorage.getItem('token') ?? ""
    this.route.paramMap.subscribe((params)=> {
      this.id = params.get('id')
      if(this.id){
        this.loadArtist(this.id!)
        this.loadAlbumsOnly(this.id!)
        this.loadSinglesOnly(this.id!)
      }
    })
  }
  getUser(){
    if(this.accessToken.length > 0){
      this.userAuthenticated = true
      this.serviceUser.getUser(this.accessToken).subscribe(user => {
        this.user = user
        if(this.artistItem && this.user.artistsSaved){
         this.saved = this.user.artistsSaved?.includes(this.artistItem.id) ?? false
        }
      })
    }
  }
  saveOrRemoveArtist(id: string, isSaved: boolean): void {
    if(this.userAuthenticated === false) {
      this.router.navigate(['/login'])
      return
    }
    if(this.accessToken && isSaved === false){
      this.serviceUser.saveArtistsToFavorite(this.accessToken, id).pipe(
        catchError((code)=> {
          if(code.status === 400){
             alert("Erro: " + code.error)
          }else if(code.status === 500){
            alert("Erro no servidor: " + code.error)
          }else if(code.status !== 200){
            alert("Erro desconhecido")
          }
          return throwError(() => code)
        })
      ).subscribe()
      this.saved = true
    }else if(this.accessToken && isSaved === true){
      this.serviceUser.removeArtistsFavorites(this.accessToken, id).pipe(
        catchError((code)=> {
          if(code.status === 400){
             alert("Erro: " + code.error)
          }else if(code.status === 500){
            alert("Erro no servidor: " + code.error)
          }else if(code.status !== 200){
            alert("Erro desconhecido")
          }
          return throwError(() => code)
        })
      ).subscribe()
      this.saved = false

    }
  }

  
loadAlbumsOnly(id: string): void {
  const offset = this.pageAlbums * this.limit;

  this.serviceSpotify
    .getAlbumsByArtist(id, this.limit, offset, 'album')
    .subscribe(items => {
      this.albumItems = items;
      this.hasMoreAlbums = items.length === this.limit;
    });
}

loadSinglesOnly(id: string): void {
  const offset = this.pageSingles * this.limit;

  this.serviceSpotify
    .getAlbumsByArtist(id, this.limit, offset, 'single')
    .subscribe(items => {
      this.singleItems = items;
      this.hasMoreSingles = items.length === this.limit;
    });
}

nextPage(type: 'album' | 'single'): void {
  if (type === 'album') {
    if (!this.hasMoreAlbums) return;

    const nextPage = this.pageAlbums + 1;
    const offset = nextPage * this.limit;

    this.serviceSpotify
      .getAlbumsByArtist(this.id!, this.limit, offset, 'album')
      .subscribe(items => {

        if (items.length === 0) {
          this.hasMoreAlbums = false;
          return; 
        }

        this.pageAlbums = nextPage; 
        this.albumItems = items;
        this.hasMoreAlbums = items.length === this.limit;
      });

  } else {
    if (!this.hasMoreSingles) return;

    const nextPage = this.pageSingles + 1;
    const offset = nextPage * this.limit;

    this.serviceSpotify
      .getAlbumsByArtist(this.id!, this.limit, offset, 'single')
      .subscribe(items => {

        if (items.length === 0) {
          this.hasMoreSingles = false;
          return;
        }

        this.pageSingles = nextPage;
        this.singleItems = items;
        this.hasMoreSingles = items.length === this.limit;
      });
  }
}

prevPage(type: 'album' | 'single'): void {
  if (type === 'album') {
    if (this.pageAlbums === 0) return;
    this.pageAlbums--;
    this.loadAlbumsOnly(this.id!);
  } else {
    if (this.pageSingles === 0) return;
    this.pageSingles--;
    this.loadSinglesOnly(this.id!);
  }
}

  loadArtist(id: string): void {
    this.serviceSpotify.getArtistById(id).subscribe(
      artist => {
        this.artistItem = artist
        this.getUser()
      }
    )
    this.dataLoaded = true
  }
  getArtistsString(artists: Pick<Artist, 'id' | 'name'>[]): string {
    return artists.map(artist => artist.name).join(', ');
  }
  getYearFromReleaseDate(releaseDate: string): string {
    return releaseDate.split('-')[0]; // Retorna o primeiro elemento que é o ano
  }
}
