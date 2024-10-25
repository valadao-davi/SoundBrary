import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  albumType!: string
  urlLink!: string

  id!: string | null;
  constructor(private router: Router,private route: ActivatedRoute, private serviceSpotify: ServiceMusicService){

  }
  ngOnInit(){
    this.route.paramMap.subscribe((params)=> {
      this.id = params.get('id')
      if(this.id){
        this.loadMusic(this.id!)
      }
    })
  }
  navigateArtist(id: string) {
    this.router.navigate([`/artista/${id}`])
  }

  loadMusic(id: string): void {
    this.serviceSpotify.getMusicById(id).subscribe(
      (params) => {
        this.artistNames = params.artists.map((artist: any)=> ({
          name: artist.name,
          id: artist.id
        }))
        this.musicName = params.name,
        this.releaseDate = params.releaseDate,
        this.albumImage = params.albumImages[0].link,
        this.albumId = params.albumId,
        this.albumName = params.albumName,
        this.dataLoaded = true,
        this.albumType = params.albumType
        this.urlLink = params.externalLink
      }
    )
  }
}
