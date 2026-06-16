import { ServiceMusicService } from '../../services/service-music.service';
import { Component, Input, ViewChild } from '@angular/core';
import { User } from '../User';
import { ServiceUserService } from 'src/app/services/service-user.service';
import { catchError, forkJoin, of } from 'rxjs';
import { Music } from '../Music';
import { Artist } from '../Artists';
import { Album } from '../Album';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceDissayService } from 'src/app/services/service-dissay.service';
import { Dissay } from '../Dissay';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { OverlayService } from 'src/app/services/overlay.service';
import { CdkPortal } from '@angular/cdk/portal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  listIdsDissaysCreated!: string[]

  overlayRef!: OverlayRef;

  typeCard: string = '';


  listIdsString: { musics: string[], albums: string[], artists: string[], dissays: string[]} = {
    musics: [],
    albums: [],
    artists: [],
    dissays: []
  }
  musicsList!: Music[]
  albumsList!: Album[]
  dissaysList!: Dissay[]
  dissaysListPrivate!: Dissay[]

  dataLoad: boolean = false;
  artistsList!: Artist[]
  query!: string | null

  @ViewChild(CdkPortal) portal!: CdkPortal

  constructor(private router: ActivatedRoute, private serviceUser: ServiceUserService, private serviceSpotify: ServiceMusicService, private serviceDissay: ServiceDissayService,
    private overlay: Overlay, private overlayRefSerivce: OverlayService
  ){}

  openImageSetter(type: string) {
    this.typeCard = type
    if (!this.overlayRef) {
      const config = new OverlayConfig({
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
        hasBackdrop: true,
      });
      this.overlayRef = this.overlay.create(config);
    }
    this.overlayRef.attach(this.portal);
    this.overlayRef.backdropClick().subscribe(() => this.closeCard(this.overlayRef));
  }

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
      }else{
        this.dataLoad = true
        this.userAuth = null
      }
      this.router.paramMap.subscribe((params)=> {
        this.query = params.get('query')
        if(this.query){
          this.getAllUser(this.query)
        }
      })
  }
  closeCard(overlayRef: OverlayRef){
    if(this.overlayRef?.hasAttached()){
      this.overlayRef.detach()
    }else{
      }
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
          this.listIdsString.dissays = this.myUser.dissaySaved ?? []
          this.listIdsDissaysCreated = this.myUser.dissaysCreated ?? []
          this.getIdsObjects()

        }else{
          this.getUserName(query)
          }
      })
    }else{
      this.getUserName(query)
      }
  }

  getUserName(query: string){
    this.serviceUser.getUserName(query).subscribe(subUser => {
      this.otherUser = subUser
      this.listIdsString.musics = this.otherUser.musicSaved ?? []
      this.listIdsString.albums = this.otherUser.albumSaved ?? []
      this.listIdsString.artists = this.otherUser.artistsSaved ?? []
      this.listIdsString.dissays = this.otherUser.dissaySaved ?? []
      this.listIdsDissaysCreated = this.otherUser.dissaysCreated ?? []
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
    if(this.listIdsDissaysCreated.length > 0){
      const items = this.listIdsDissaysCreated.map(id =>
        this.serviceDissay.getDissayById(id)
    )
      forkJoin(items).subscribe(
        (results) => {
          this.dissaysList = results.filter(i => i.isPrivate == false)
          this.dissaysListPrivate = results.filter(i => i.isPrivate == true)
          }
      )
    }
    }
  }






