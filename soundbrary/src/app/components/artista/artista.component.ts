import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceMusicService } from 'src/app/services/service-music.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent {
  albumId!: string
  albumName!: string
  albumImage!: string
  albumType!: string
  artistId!: string
  artistName!: string
  artistImage!: string
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
        this.artistName = params.artists,
        this.albumImage = params.albumImages[0].link,
        this.albumId = params.albumId,
        this.albumName = params.albumName,
        this.dataLoaded = true,
        this.albumType = params.albumType
      }
    )
  }
}
