import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Album } from 'src/app/layouts/Album';
import { Dissay } from 'src/app/layouts/Dissay';
import { Music } from 'src/app/layouts/Music';
import { ServiceDissayService } from 'src/app/services/service-dissay.service';
import { ServiceMusicService } from 'src/app/services/service-music.service';
import { ServiceUserService } from 'src/app/services/service-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  topDay: Music[] = []
  dissays: Dissay[] =[]
  dissaysMusic!: string[]
  dissaysUser!: string[]
  albumItems: Album[] = []
  dataload: boolean = false

  constructor(private serviceMusic: ServiceMusicService, private serviceDissay: ServiceDissayService, private serviceUser: ServiceUserService){ }

  loadTracks(): void {
    this.serviceMusic.getTracksPlaylist().subscribe(
      (tracks) => {
        this.topDay = tracks
        const albumMap = new Map();

        this.topDay.forEach(item => {
          if(item.albumType === "album") {
            const albumData = {
              id: item.albumId,
              albumName: item.albumName,
              artists: item.artists,
              albumImage: item.albumImages
            }
            albumMap.set(albumData.id, albumData)
          }
        })

        this.albumItems = Array.from(albumMap.values())
        this.dataload = true
        console.log(this.albumItems)
      },
      (error) => {
        console.error(error)
      }
    )
  }
  loadDissays(): void {
    this.serviceDissay.getAllDissays().subscribe(dissays => {
      this.dissays = dissays
      console.log(this.dissays)
    })
  }

  ngOnInit(): void {
    this.loadTracks()
    this.loadDissays()
  }



}
