import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Music } from 'src/app/layouts/Music';
import { ServiceMusicService } from 'src/app/services/service-music.service';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent {
  dataLoaded!: boolean
  musicItem?: Music;

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
    this.serviceSpotify.getMusicById(id).subscribe(music => {
      this.musicItem = music
      this.dataLoaded = true
      console.log(this.musicItem.albumImages[0].link)
    })
  }
}
