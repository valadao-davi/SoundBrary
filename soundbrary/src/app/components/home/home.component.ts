import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ServiceMusicService } from 'src/app/services/service-music.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  topDay: any[] = []
  albumItems: any[] = []

  constructor(private serviceMusic: ServiceMusicService){ }

  loadTracks(): void {
    this.serviceMusic.getTracksPlaylist().subscribe(
      (tracks) => {
        this.topDay = tracks
        const albumMap = new Map();

        this.topDay.forEach(item => {
          if(item.album_type === "album") {
            const albumData = {
              id: item.album_id,
              album_name: item.album_name,
              artist: item.artist_name[0].name,
              url: item.image_urls[1].link
            }
            albumMap.set(albumData.id, albumData)
          }
        })

        this.albumItems = Array.from(albumMap.values())
      },
      (error) => {
        console.error(error)
      }
    )
  }

  ngOnInit(): void {
    this.loadTracks()
  }



}
