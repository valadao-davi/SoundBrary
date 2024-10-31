import { Component } from '@angular/core';
import { User } from '../User';
import { ServiceUserService } from 'src/app/services/service-user.service';
import { ServiceMusicService } from 'src/app/services/service-music.service';
import { Music } from '../Music';
import { forkJoin } from 'rxjs';
import { Album } from '../Album';
import { Artist } from '../Artists';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.css']
})
export class ProfileLayoutComponent {
  acessToken!: string;
  user!: User
  listIdsStrings: {musics: string[], albums: string[], artists: string[]} = {
    musics: [],
    albums: [],
    artists: []
  }
  musicsSaved!: Music[];
  albumsSaved!: Album[];
  artistsSaved!: Artist[];

  constructor(private serviceUser: ServiceUserService, private serviceSpotify: ServiceMusicService){}

  ngOnInit(){
    this.acessToken = localStorage.getItem('token') ?? ""
    console.log(this.acessToken)
    this.getUser()
  }

  getUser(){
    if(this.acessToken.length > 0){
      this.serviceUser.getUser(this.acessToken).subscribe(user => {
        this.user = user
        this.listIdsStrings.musics = this.user.musicSaved ?? []
        this.listIdsStrings.albums = this.user.albumSaved ?? []
        this.listIdsStrings.artists = this.user.artistsSaved ?? []
        this.getIds()
      })
    }
  }

  getIds(){
    if(this.listIdsStrings.musics.length > 0){
      const items = this.listIdsStrings.musics.map(id =>
        this.serviceSpotify.getMusicById(id)
      );
      forkJoin(items).subscribe(
        (results) => {
          this.musicsSaved = results
        }
      )
    }
    if(this.listIdsStrings.albums.length > 0){
      const items = this.listIdsStrings.albums.map(id =>
        this.serviceSpotify.getAlbumById(id)
      );
      forkJoin(items).subscribe(
        (results) => {
          this.albumsSaved = results
        }
      )
    }
    if(this.listIdsStrings.artists.length > 0){
      const items = this.listIdsStrings.artists.map(id =>
        this.serviceSpotify.getArtistById(id)
      );
      forkJoin(items).subscribe(
        (results) => {
          this.artistsSaved = results
        }
      )
    }

  }

}
