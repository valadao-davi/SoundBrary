import { ServiceMusicService } from './../../services/service-music.service';
import { Component } from '@angular/core';
import { User } from '../User';
import { ServiceUserService } from 'src/app/services/service-user.service';
import { forkJoin } from 'rxjs';
import { Music } from '../Music';
import { Artist } from '../Artists';
import { Album } from '../Album';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.css']
})
export class ProfileLayoutComponent {
  acessToken!: string;
  user!: User
  listIdsString: { musics: string[], albums: string[], artists: string[]} = {
    musics: [],
    albums: [],
    artists: []
  }
  musicsList!: Music[]
  albumsList!: Album[]
  artistsList!: Artist[]

  constructor(private serviceUser: ServiceUserService, private serviceSpotify: ServiceMusicService){}

  ngOnInit(){
    this.acessToken = localStorage.getItem('token') ?? ""
    console.log(this.acessToken)
    this.getUser()
    console.log(this.acessToken)
  }

  getUser(){
    if(this.acessToken.length > 0){
      this.serviceUser.getUser(this.acessToken).subscribe(user => {
        this.user = user
        console.log(this.user)
        this.listIdsString.musics = this.user.musicSaved ?? []
        this.listIdsString.albums = this.user.albumSaved ?? []
        this.listIdsString.artists = this.user.artistsSaved ?? []
        console.log(this.listIdsString.musics)
        this.getIdsObjects()
      })
    }
  }

  getIdsObjects(){
    if(this.listIdsString.musics.length > 0){
      const items = this.listIdsString.musics.map(id =>
        this.serviceSpotify.getMusicById(id)
      )
      forkJoin(items).subscribe(
        (results) => {
          this.musicsList = results
          console.log(this.musicsList)
        }
      )
    }
    if(this.listIdsString.artists.length > 0) {
      const items = this.listIdsString.artists.map(id =>
        this.serviceSpotify.getArtistById(id)
      )
      forkJoin(items).subscribe(
        (results) => {
          this.artistsList = results
        }
      )
    }
    if(this.listIdsString.albums.length > 0) {
      const items = this.listIdsString.albums.map(id =>
        this.serviceSpotify.getAlbumById(id)
      )
      forkJoin(items).subscribe(
        (results) => {
          this.albumsList = results
        }
      )
    }
    }
  }






