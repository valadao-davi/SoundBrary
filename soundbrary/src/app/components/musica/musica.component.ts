import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceMusicService } from 'src/app/services/service-music.service';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent {
  musicName!: string
  releaseDate!: string
  albumImage!: string
  artistNames!: any[]
  albumId!: string
  albumName!: string
  dataLoaded!: boolean

  id!: string | null;
  constructor(private route: ActivatedRoute, private serviceSpotify: ServiceMusicService){

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
    this.serviceSpotify.getMusicById(id).subscribe(
      (params) => {
        this.artistNames = params.artists.map((artist: any)=> ({
          name: artist.name,
        }))
        this.musicName = params.name,
        this.releaseDate = params.releaseDate,
        this.albumImage = params.albumImages[0].link,
        this.albumId = params.albumId,
        this.albumName = params.albumName,
        this.dataLoaded = true
      }
    )
  }
}
