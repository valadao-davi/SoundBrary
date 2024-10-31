import { User } from 'src/app/layouts/User';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Music } from 'src/app/layouts/Music';
import { ServiceMusicService } from 'src/app/services/service-music.service';
import { ServiceUserService } from 'src/app/services/service-user.service';
import { catchError, tap, throwError } from 'rxjs';

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
  user?: User;

  id!: string | null;
  constructor(private router: Router,private route: ActivatedRoute, private serviceSpotify: ServiceMusicService, private serviceUser: ServiceUserService){

  }
  ngOnInit(){
    this.accessToken = localStorage.getItem('token') ?? ""
    this.route.paramMap.subscribe((params)=> {
      this.id = params.get('id')
      if(this.id){
        this.loadMusic(this.id!)
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
        if(this.musicItem && this.user.musicSaved){
         this.saved = this.user.musicSaved?.includes(this.musicItem.id) ?? false
        }
      })
    }
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
      this.serviceUser.removeSongFavorites(this.accessToken, id).pipe(
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

  loadMusic(id: string): void {
    this.serviceSpotify.getMusicById(id).subscribe(music => {
      this.musicItem = music
      this.dataLoaded = true
      this.getUser()
    })
  }
}
