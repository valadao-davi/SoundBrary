import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceMusicService } from 'src/app/services/service-music.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent {
  artistId!: string
  artistName!: string
  artistImage!: string
  dataLoaded!: boolean
  externalLink!: string;
  genres!: string[];
  followers!: number;
  allItems: any[] = []
  albumItems:any[] = [];
  singleItems: any[] = [];

  id!: string | null;
  constructor(private route: ActivatedRoute, private serviceSpotify: ServiceMusicService){

  }
  ngOnInit(){
    this.dataLoaded = true

    this.route.paramMap.subscribe((params)=> {
      this.id = params.get('id')
      if(this.id){
        this.loadArtist(this.id!)
        this.loadAlbums(this.id!)
      }
    })
  }
  loadAlbums(id: string): void {
    this.serviceSpotify.getAlbumsByArtist(id).subscribe(
      (items) => {
        this.albumItems = items.filter(item => item.type === "album"),
        this.singleItems = items.filter(item => item.type === "single")
        console.log(this.albumItems)
        console.log(this.singleItems)
      }
    )
  }
  loadArtist(id: string): void {
    this.serviceSpotify.getArtistById(id).subscribe(
      (params) => {
        this.artistName = params.name,
        this.artistImage = params.artistImages[0].link,
        this.dataLoaded = true,
        this.externalLink = params.externalLink,
        this.genres = params.genres
        this.followers = params.artistFollowers.total
        console.log(this.externalLink)

      }
    )
  }
  getArtistsString(artists: any[]): string {
    return artists.map(artist => artist.name).join(', ');
  }
  getYearFromReleaseDate(releaseDate: string): string {
    return releaseDate.split('-')[0]; // Retorna o primeiro elemento que é o ano
  }
}
