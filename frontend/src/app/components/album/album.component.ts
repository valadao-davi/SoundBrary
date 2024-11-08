import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, forkJoin, throwError } from 'rxjs';
import { Album } from 'src/app/layouts/Album';
import { Dissay } from 'src/app/layouts/Dissay';
import { Music } from 'src/app/layouts/Music';
import { User } from 'src/app/layouts/User';
import { ServiceDissayService } from 'src/app/services/service-dissay.service';
import { ServiceMusicService } from 'src/app/services/service-music.service';
import { ServiceUserService } from 'src/app/services/service-user.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {

  @Input() trackName!: string;
  albumItem?: Album;
  accessToken!: string
  saved: boolean = false;
  user?: User;
  musicsIds?: string[]
  dissaysAlbums?: Dissay[]
  dataLoaded!: boolean
  id!: string | null;
  constructor(private route: ActivatedRoute, private router: Router, private serviceSpotify: ServiceMusicService, private serviceUser: ServiceUserService, private serviceDissay: ServiceDissayService){

  }

  navigateMusic(id: string) {
    this.router.navigate([`/musica/${id}`])
  }
  navigateArtist(id: string) {
    this.router.navigate([`/artista/${id}`])
  }

  ngOnInit(){
    this.accessToken = localStorage.getItem('token') ?? ""
    this.route.paramMap.subscribe((params)=> {
      this.id = params.get('id')
      if(this.id){
        this.loadAlbum(this.id!)
      }
    })
  }
  getUser(){
    if(this.accessToken.length > 0){
      this.serviceUser.getUser(this.accessToken).subscribe(user => {
        this.user = user
        if(this.albumItem && this.user.albumSaved){
         this.saved = this.user.albumSaved?.includes(this.albumItem.id) ?? false
        }
      })
    }
  }
  saveOrRemoveAlbum(id: string, isSaved: boolean): void {
    if(this.accessToken && isSaved === false){
      this.serviceUser.saveAlbumToFavorite(this.accessToken, id).pipe(
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
      this.serviceUser.removeAlbumFavorites(this.accessToken, id).pipe(
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

  loadAlbum(id: string): void {
    this.serviceSpotify.getAlbumById(id).subscribe(
      album => {
        this.albumItem = album
        this.musicsIds = this.albumItem.tracks.map(music => {
          return music.id
        })
        this.dataLoaded = true
        this.getUser()
        this.loadDissay()
      }
    )
  }

  loadDissay(){
    if(this.musicsIds && this.musicsIds.length > 0){
      const items = this.musicsIds?.map(id =>
        this.serviceDissay.getDissayByMusic(id)
      )
      forkJoin(items).subscribe(
        (results) => {
          this.dissaysAlbums = results.flat()
        }
      )
    }
    
  }
  hasDissaysForMusic(musicId: string): boolean {
    return this.dissaysAlbums?.some(dissay => dissay.musicId === musicId) ?? false;
  }
}
