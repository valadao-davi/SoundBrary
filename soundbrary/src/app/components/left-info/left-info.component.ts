import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from 'src/app/layouts/Album';
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
  @Input() urlLink!: string;
  @Input() isArtistPage: boolean = false;
  albumItem?: Album

  constructor(private router: Router,private serviceSpotify: ServiceMusicService){

  }

  navigateAlbum(id: string) {
    this.router.navigate([`/album/${id}`])
  }

  navigateMusic(id: string) {
    this.router.navigate([`/musica/${id}`])
  }

  ngOnInit(){
    if(this.isArtistPage === false){
      this.loadAlbumTracks(this.albumId!)
    }
  }

  loadAlbumTracks(id: string): void {
    this.serviceSpotify.getAlbumById(id).subscribe(
      album => {
        this.albumItem = album
      }
    )
  }
}
