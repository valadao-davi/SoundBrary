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

  id!: string | null;
  constructor(private route: ActivatedRoute, private serviceSpotify: ServiceMusicService){

  }
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id')
    this.loadMusic(this.id!)
  }
  loadMusic(id: string): void {
    this.serviceSpotify.getMusicById(id).subscribe(
      (params) => {
        this.artistNames = params.artists.map((artist: any)=> ({
          name: artist.name,
        }))
        this.musicName = params.name,
        this.releaseDate = params.releaseDate,
        this.albumImage = params.albumImages[0].link
      }
    )
  }
}
