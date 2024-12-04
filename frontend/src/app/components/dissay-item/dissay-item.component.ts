import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Dissay } from 'src/app/layouts/Dissay';
import { Instrument } from 'src/app/layouts/Instrument';
import { ServiceUserService } from 'src/app/services/service-user.service';

@Component({
  selector: 'app-dissay-item',
  templateUrl: './dissay-item.component.html',
  styleUrls: ['./dissay-item.component.css']
})
export class DissayItemComponent {
  @Input() dissayData!: Dissay
  @Input() dataLoaded: boolean = false
  @Input() name!: string;
  @Input() listInstruments!: Instrument[];
  @Input() date!: Date | string;
  @Input() userName!: string
  @Input() desc: string = "Sem descrição"
  @Input() rateNumber: number = 0.0
  @Input() dissayId: string = ''
  userImage: string = ''

  constructor(private router: Router,private serviceUser: ServiceUserService){}


  ngOnInit(){
    this.userName = this.dissayData.userName
    this.desc = this.dissayData.desc ?? ""
    if(this.userName){
      this.serviceUser.getUserName(this.userName).subscribe(user => {
        this.userImage = user.image ?? ""
      })
    }
    console.log(this.name)
  }
  navigateDissay(id: string) {
    this.router.navigate([`/dissay/${id}`]);
  }
}
