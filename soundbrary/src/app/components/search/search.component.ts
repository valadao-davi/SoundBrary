import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  categoria = "catMusica";

  changeMusica() {
    this.categoria = "catMusica"
  }
  changeAlbuns() {
    this.categoria = "catAlbuns"
  }
  changeSinglesEps() {
    this.categoria = "catSinglesEps"
  }
  changeArtistas() {
    this.categoria = "catArtistas"
  }
  changeDissays() {
    this.categoria = "catDissays"
  }

}
