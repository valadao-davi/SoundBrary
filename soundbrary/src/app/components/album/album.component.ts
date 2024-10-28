import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/layouts/Album';
import { ServiceMusicService } from 'src/app/services/service-music.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {

  @Input() trackName!: string;
  albumItem?: Album;
  dataLoaded!: boolean


  id!: string | null;
  constructor(private route: ActivatedRoute, private router: Router, private serviceSpotify: ServiceMusicService){

  }

  navigateMusic(id: string) {
    this.router.navigate([`/musica/${id}`])
  }
  navigateArtist(id: string) {
    this.router.navigate([`/artista/${id}`])
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
      album => {
        this.albumItem = album
        this.dataLoaded = true
      }
    )

  }

}
