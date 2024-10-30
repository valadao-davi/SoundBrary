import { User } from 'src/app/layouts/User';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Music } from 'src/app/layouts/Music';
import { ServiceMusicService } from 'src/app/services/service-music.service';
import { ServiceUserService } from 'src/app/services/service-user.service';

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
          this.getUser()
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
        if(this.user?._musicSaved?.includes(this.id!)){
          this.saved = true
        }else{
          this.saved = false
        }
      })
    }
  }

  saveSong(id: string): void {
    if(this.accessToken){
      this.serviceUser.saveSongToFavorite(this.accessToken, id).subscribe(
      )
      this.saved = true

    }
  }

  removeSongFavorite(id: string): void {
    if(this.accessToken){
      this.serviceUser.removeSongFavorites(this.accessToken, id).subscribe()
      this.saved = false
    }
  }

  loadMusic(id: string): void {
    this.serviceSpotify.getMusicById(id).subscribe(music => {
      this.musicItem = music
      this.dataLoaded = true
      console.log(this.musicItem.albumImages[0].link)
    })
  }
}
