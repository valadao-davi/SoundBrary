import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceMusicService } from 'src/app/services/service-music.service';

@Component({
  selector: 'app-left-info',
  templateUrl: './left-info.component.html',
  styleUrls: ['./left-info.component.css']
})
export class LeftInfoComponent {
  @Input() urlImage!: string;
  @Input() albumId!: string;
  @Input() trackName!: string;
  @Input() albumTitle!: string;
  albumName!: string;
  albumTracks!: any[]
  albumType!: string

  constructor(private router: Router,private serviceSpotify: ServiceMusicService){

  }

  navigateAlbum(id: string) {
    this.router.navigate([`/album/${id}`])
  }

  navigateMusic(id: string) {
    this.router.navigate([`/musica/${id}`])
  }

  ngOnInit(){
    this.loadAlbumTracks(this.albumId!)
  }

  loadAlbumTracks(id: string): void {
    this.serviceSpotify.getAlbumById(id).subscribe(
      (params) => {
        this.albumName = params.albumName
        this.albumType = params.albumType
        this.albumTracks = params.tracks.map((item: any) => ({
          id: item.id,
          name: item.name,
          orderTrack: item.orderTrack,
          duration: item.duration
        }))
      }
    )
  }
}
