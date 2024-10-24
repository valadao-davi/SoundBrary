import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceMusicService } from 'src/app/services/service-music.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {

  releaseDate!: string
  albumImage!: string
  artistNames!: any[]
  albumId!: string
  albumName!: string
  dataLoaded!: boolean
  albumType!: string

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
  }

}
