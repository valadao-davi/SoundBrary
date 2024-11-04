import { ServiceMusicService } from '../../services/service-music.service';
import { Component, Input } from '@angular/core';
import { User } from '../User';
import { ServiceUserService } from 'src/app/services/service-user.service';
import { catchError, forkJoin, of } from 'rxjs';
import { Music } from '../Music';
import { Artist } from '../Artists';
import { Album } from '../Album';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceDissayService } from 'src/app/services/service-dissay.service';
import { Dissay } from '../Dissay';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.css']
})
export class ProfileLayoutComponent {
  accessToken!: string;
  userAuth!: User | null;
  otherUser!: User
  myUser!: User
  isOwnProfile: boolean = false
  listIdsDissays!: string[]

  listIdsString: { musics: string[], albums: string[], artists: string[], dissays: []} = {
    musics: [],
    albums: [],
    artists: [],
    dissays: []
  }
  musicsList!: Music[]
  albumsList!: Album[]
  dissaysList!: Dissay[]
  dataLoad: boolean = false;
  artistsList!: Artist[]
  query!: string | null

  constructor(private router: ActivatedRoute, private serviceUser: ServiceUserService, private serviceSpotify: ServiceMusicService, private serviceDissay: ServiceDissayService){}

  ngOnInit(){
    this.accessToken = localStorage.getItem('token') ?? ""
    if(this.accessToken){
      this.serviceUser.getUser(this.accessToken).pipe(
        catchError(error => {
          if (error.status === 404) {
            this.dataLoad = true
            this.userAuth = null
          }
          return of(null);
        })
      ).subscribe(user => {
        this.userAuth = user
        if(this.userAuth !== null){
          this.dataLoad = true
        }
      })
      }
      this.router.paramMap.subscribe((params)=> {
        this.query = params.get('query')
        if(this.query){
          this.getAllUser(this.query)
        }
      })
  }

  getAllUser(query: string){
    if(this.accessToken.length > 0){
      this.serviceUser.getUser(this.accessToken).subscribe(user => {
        this.myUser = user
        if(this.myUser.userName === query){
          this.isOwnProfile = true
          this.listIdsString.musics = this.myUser.musicSaved ?? []
          this.listIdsString.albums = this.myUser.albumSaved ?? []
          this.listIdsString.artists = this.myUser.artistsSaved ?? []
          this.listIdsDissays = this.myUser.dissaysCreated ?? []
          this.getIdsObjects()
        }else{
          this.getUserName(query)
          console.log("usuario pesquisado")
        }
      })
    }else{
      this.getUserName(query)
      console.log("usuario pesquisado")
    }
  }

  getUserName(query: string){
    this.serviceUser.getUserName(query).subscribe(subUser => {
      this.otherUser = subUser
      this.listIdsString.musics = this.otherUser.musicSaved ?? []
      this.listIdsString.albums = this.otherUser.albumSaved ?? []
      this.listIdsString.artists = this.otherUser.artistsSaved ?? []
      this.listIdsDissays = this.otherUser.dissaysCreated ?? []
      this.getIdsObjects()
  })
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
    if(this.listIdsDissays.length > 0){
      console.log(this.listIdsDissays)
      const items = this.listIdsDissays.map(id =>
        this.serviceDissay.getDissayById(id)
    )
      forkJoin(items).subscribe(
        (results) => {
          this.dissaysList = results
          console.log(this.dissaysList)
        }
      )
    }
    }
  }







