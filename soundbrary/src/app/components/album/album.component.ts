import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceMusicService } from 'src/app/services/service-music.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {

  @Input() trackName!: string;
  releaseDate!: string
  albumImage!: string
  artistNames!: any[]
  albumId!: string
  albumName!: string
  dataLoaded!: boolean
  albumType!: string
  albumTracks!: any[]

  id!: string | null;
  constructor(private route: ActivatedRoute, private router: Router, private serviceSpotify: ServiceMusicService){

  }

  navigateMusic(id: string) {
    this.router.navigate([`/musica/${id}`])
  }
  
  

  ngOnInit(){
    this.route.paramMap.subscribe((params)=> {
      this.id = params.get('id')
      if(this.id){
        this.loadMusic(this.id!)
      }
    })
  }
  loadMusic(id: string): void {
    this.serviceSpotify.getAlbumById(id).subscribe(
      (params) => {
        this.artistNames = params.artists.map((artist: any)=> ({
          name: artist.name,
        }))
        this.releaseDate = params.releaseDate,
        this.albumImage = params.albumImage[0].link,
        this.albumId = params.id,
        this.albumName = params.albumName,
        this.dataLoaded = true,
        this.albumType = params.albumType
      }
    )

    this.serviceSpotify.getAlbumById(id).subscribe(
      (params) => {
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
