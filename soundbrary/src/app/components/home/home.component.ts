import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ServiceMusicService } from 'src/app/services/service-music.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  topDay: any[] = []

  constructor(private serviceMusic: ServiceMusicService){ }

  loadTracks(): void {
    this.serviceMusic.getTracksPlaylist().subscribe(
      (tracks) => {
        this.topDay = tracks
        console.log('lista: ', this.topDay)
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
