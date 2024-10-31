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
  dataLoaded!: boolean;
  itemsAlbum: Album[] = [];
  accessToken!: string
  saved: boolean = false;
  user?: User;

  id!: string | null;
  constructor(private router: Router,private route: ActivatedRoute, private serviceSpotify: ServiceMusicService, private serviceUser: ServiceUserService){

  }
  navigateAlbum(id: string) {
    this.router.navigate([`/album/${id}`])
  }

  ngOnInit(){
    this.accessToken = localStorage.getItem('token') ?? ""
    this.dataLoaded = true
    this.route.paramMap.subscribe((params)=> {
      this.id = params.get('id')
      if(this.id){
        this.loadArtist(this.id!)
        this.loadAlbums(this.id!)
      }
    })
  }
  getUser(){
    if(this.accessToken.length > 0){
      this.serviceUser.getUser(this.accessToken).subscribe(user => {
        this.user = user
        if(this.artistItem && this.user.artistsSaved){
         this.saved = this.user.artistsSaved?.includes(this.artistItem.id) ?? false
        }
      })
    }
  }
  saveArtistOrRemove(id: string, isSaved: boolean): void {
    console.log(isSaved)
    if(this.accessToken && isSaved === false){
      this.serviceUser.saveArtistsToFavorite(this.accessToken, id).pipe(
        catchError((code)=> {
          if(code.status === 400){
             alert("Erro: " + code.error)
          }else if(code.status === 500){
            alert("Erro no servidor: " + code.error)
          }
          return throwError(() => code)
        })
      ).subscribe({
        next: () => {
          this.saved = true
        },
        error: (err) => {
          console.error(err)
        }
      })
      this.saved = true
    }else if(this.accessToken && isSaved === true){
      this.serviceUser.removeArtistsFavorites(this.accessToken, id).pipe(
        catchError((code)=> {
          if(code.status === 400){
             alert("Erro: " + code.error)
          }else if(code.status === 500){
            alert("Erro no servidor: " + code.error)
          }
          return throwError(() => code)
        })
      ).subscribe({
        next: () => {
          this.saved = true
        },
        error: (err) => {
          console.error(err)
        }
      })
      this.saved = false

    }
  }

  loadAlbums(id: string): void {
    this.serviceSpotify.getAlbumsByArtist(id).subscribe(
      items => {
        this.itemsAlbum = items
        this.albumItems = this.itemsAlbum.filter(items => items.albumType === "album")
        this.singleItems = this.itemsAlbum.filter(items => items.albumType === "single")
      }
    )
  }
  loadArtist(id: string): void {
    this.serviceSpotify.getArtistById(id).subscribe(
      artist => {
        this.artistItem = artist
        this.getUser()
      }
    )
  }
  getArtistsString(artists: Pick<Artist, 'id' | 'name'>[]): string {
    return artists.map(artist => artist.name).join(', ');
  }
  getYearFromReleaseDate(releaseDate: string): string {
    return releaseDate.split('-')[0]; // Retorna o primeiro elemento que é o ano
  }
}
