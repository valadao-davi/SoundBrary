import { AfterViewInit, Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
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
  topDissays: Dissay[]=[]
  recentDissays: Dissay[]=[]
  albumItems: Album[] = []
  musicLoad: boolean = false;
  dataload: boolean = false
  dissayLoad: boolean = false

  isLoading: boolean = true;

  constructor(private serviceMusic: ServiceMusicService, private serviceDissay: ServiceDissayService, private serviceUser: ServiceUserService){ }

  loadData(): void {
    // Usando forkJoin para sincronizar as requisições
    forkJoin({
      tracks: this.serviceMusic.getTracksPlaylist(),
      allDissays: this.serviceDissay.getAllDissays(),
      recentDissays: this.serviceDissay.getRecentDissays()
    }).subscribe(
      ({ tracks, allDissays, recentDissays }) => {
        // Processando os resultados após todas as requisições concluírem
        this.topDay = tracks;
        const albumMap = new Map();
        this.topDay.forEach((item) => {
          if (item.albumType === 'album') {
            const albumData = {
              id: item.albumId,
              albumName: item.albumName,
              artists: item.artists,
              albumImage: item.albumImages
            };
            albumMap.set(albumData.id, albumData);
          }
        });
        this.albumItems = Array.from(albumMap.values());

        this.dissays = allDissays;
        this.topDissays = allDissays
          .filter((d) => d.totalRate !== undefined)
          .sort((a, b) => (b.totalRate ?? 0) - (a.totalRate ?? 0))
          .slice(0, 10);

        this.recentDissays = recentDissays;
        this.dataload = true
      },
      (error) => {
        
      }
    );
  }

  ngOnInit(): void {
    this.loadData()
  }



}
