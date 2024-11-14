import { User } from 'src/app/layouts/User';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Music } from 'src/app/layouts/Music';
import { ServiceMusicService } from 'src/app/services/service-music.service';
import { ServiceUserService } from 'src/app/services/service-user.service';
import { catchError, tap, throwError } from 'rxjs';
import { Dissay } from 'src/app/layouts/Dissay';
import { ServiceDissayService } from 'src/app/services/service-dissay.service';
import { query } from '@angular/animations';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent {
  dataLoaded!: boolean
  accessToken!: string
  musicItem?: Music;
  saved: boolean = false;
  listDissays: Dissay[] = []
  user?: User;

  id!: string | null;
  constructor(private router: Router,private route: ActivatedRoute, private serviceSpotify: ServiceMusicService, private serviceUser: ServiceUserService, private dissayService: ServiceDissayService){

  }
  ngOnInit(){
    this.accessToken = localStorage.getItem('token') ?? ""
    this.route.paramMap.subscribe((params)=> {
      this.id = params.get('id')
      if(this.id){
        this.loadMusic(this.id)
        this.loadDissays(this.id)
      }
    })

  }

  navigateArtist(id: string) {
    this.router.navigate([`/artista/${id}`])
  }

  getUser(){
    if(this.accessToken.length > 0){
      this.serviceUser.getUser(this.accessToken).subscribe(user => {
        this.user = user
        console.log(this.user?.musicSaved)
        if(this.musicItem && this.user.musicSaved){
         console.log(this.user.musicSaved)
         this.saved = this.user.musicSaved?.includes(this.musicItem.id) ?? false
         console.log("Is saved: ", this.saved)
         console.log("ID saved: ", this.musicItem.id)
        }
      })
    }
  }

  loadDissays(id: string){
    this.dissayService.getDissayByMusic(id).subscribe(dissays => {
      this.listDissays = dissays
      this.listDissays = this.listDissays.map(dissay => ({
        name: dissay.name,
        userName: dissay.userName,
        musicId: dissay.musicId,
        desc: dissay.desc ?? "",
        instruments: dissay.instruments,
        createdAt: new Date(dissay.createdAt).toLocaleDateString(),
        totalRate: dissay.totalRate ?? 0.0,
      }))
      console.log(this.listDissays)
    })
  }
  navigateCreate(id: string) {
    if(this.user === null){
      this.router.navigate(['/login'])
      return
    }
    this.router.navigate([`/criar-dissay`], { queryParams: { value: id } });
  }

  saveSongOrRemove(id: string, isSaved: boolean): void {
    console.log(isSaved)
    if(this.accessToken && isSaved === false){
      this.serviceUser.saveSongToFavorite(this.accessToken, id).pipe(
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
      this.serviceUser.removeSongFavorites(this.accessToken, id).pipe(
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

  loadMusic(id: string): void {
    this.serviceSpotify.getMusicById(id).subscribe(music => {
      this.musicItem = music
      this.dataLoaded = true
      this.getUser()
    })
  }
}
