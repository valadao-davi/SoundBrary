import { Component } from '@angular/core';
import { Instrument } from 'src/app/layouts/Instrument';

@Component({
  selector: 'app-criar-dissay',
  templateUrl: './criar-dissay.component.html',
  styleUrls: ['./criar-dissay.component.css']
})
export class CriarDissayComponent {

  instrumentos: Instrument[] = [
   {
      nameInstrument: "Guitarra",
      effects:
        {
          "Distortion":" 0.5",
        }
   },
   {
    nameInstrument: "Bateria",
    effects:
      {
        "Distortion":" 0.5",
      }
 },
 {
  nameInstrument: "Baixo",
  effects:
    {
      "Distortion":" 0.5",
    }
},
{
  nameInstrument: "Guitarra",
  effects:
    {
      "Distortion":" 0.5",
    }
},
{
  nameInstrument: "Guitarra",
  effects:
    {
      "Distortion":" 0.5",
    }
},

  ]

  adjustHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto'; // Reseta a altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Define a nova altura
  }
}
