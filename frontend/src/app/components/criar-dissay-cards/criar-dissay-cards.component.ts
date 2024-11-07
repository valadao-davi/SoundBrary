import { Component, Input } from '@angular/core';
import { Instrument } from 'src/app/layouts/Instrument';

@Component({
  selector: 'app-criar-dissay-cards',
  templateUrl: './criar-dissay-cards.component.html',
  styleUrls: ['./criar-dissay-cards.component.css']
})
export class CriarDissayCardsComponent {
  @Input() instrumento!: Instrument
  @Input() afinacao!: string

}
