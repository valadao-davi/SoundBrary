import { Component, Input } from '@angular/core';
import { Instrument } from 'src/app/layouts/Instrument';

@Component({
  selector: 'app-dissay-item',
  templateUrl: './dissay-item.component.html',
  styleUrls: ['./dissay-item.component.css']
})
export class DissayItemComponent {
  @Input() dataLoaded: boolean = false
  @Input() name!: string;
  @Input() listInstruments!: Instrument[];
  @Input() date!: Date | string;
  @Input() userName!: string
  @Input() desc: string = "Sem descrição"
  @Input() rateNumber: number = 0.0


  ngOnInit(){
    console.log(this.name)
  }
}
