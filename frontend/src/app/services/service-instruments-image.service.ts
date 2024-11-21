import { Injectable } from '@angular/core';
import { DefaultInstrument } from "../layouts/DefaultInstrument";

@Injectable({
  providedIn: 'root'
})
export class ServiceInstrumentsImageService {

  constructor() { }

  private instrumentosPadrao: DefaultInstrument[] = [
    {
      nameInstrument: "Guitarra",
      imageUrl: "../../../assets/guitarra_icon.svg"
    },
    {
      nameInstrument: "Bateria",
      imageUrl: "../../../assets/bateria_icon.svg"
    },
    {
      nameInstrument: "Baixo",
      imageUrl: "../../../assets/baixo_icon.svg"
    },
    {
      nameInstrument: "Piano",
      imageUrl: "../../../assets/piano.svg"
    },
    {
      nameInstrument: "Cordas",
      imageUrl: "../../../assets/cordas.svg"
    },
    {
      nameInstrument: "Vocal",
      imageUrl: "../../../assets/vocais.svg"
    },
    {
      nameInstrument: "Madeiras",
      imageUrl: "../../../assets/madeiras.svg"
    },
    {
      nameInstrument: "Metais",
      imageUrl: "../../../assets/metais.svg"
    },
    {
      nameInstrument: "Violão",
      imageUrl: "../../../assets/violao.svg"
    },
    {
      nameInstrument: "Sintetizador",
      imageUrl: "../../../assets/sintetizador.svg"
    },

  ]

  getDefaultInstruments(): DefaultInstrument[] {
    return this.instrumentosPadrao
  }
}
