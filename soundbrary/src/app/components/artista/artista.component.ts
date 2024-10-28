import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/layouts/Album';
import { Artist } from 'src/app/layouts/Artists';
import { ServiceMusicService } from 'src/app/services/service-music.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent {
  artistItem?: Artist;
  albumItems:Album[] = [];
  singleItems: Album[] = [];
  dataLoaded!: boolean;
  itemsAlbum: Album[] = [];

  id!: string | null;
  constructor(private router: Router,private route: ActivatedRoute, private serviceSpotify: ServiceMusicService){

  }
  navigateAlbum(id: string) {
    this.router.navigate([`/album/${id}`])
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
      items => {
        this.itemsAlbum = items
        console.log(this.itemsAlbum)
        this.albumItems = this.itemsAlbum.filter(items => items.albumType === "album")
        this.singleItems = this.itemsAlbum.filter(items => items.albumType === "single")
      }
    )
  }
  loadArtist(id: string): void {
    this.serviceSpotify.getArtistById(id).subscribe(
      artist => {
        this.artistItem = artist
      }
    )
  }
  getArtistsString(artists: Pick<Artist, 'id' | 'name'>[]): string {
    return artists.map(artist => artist.name).join(', ');
  }
  getYearFromReleaseDate(releaseDate: string): string {
    return releaseDate.split('-')[0]; // Retorna o primeiro elemento que é o ano
  }
}
