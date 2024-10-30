import { Component } from '@angular/core';
import { User } from '../User';
import { ServiceUserService } from 'src/app/services/service-user.service';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.css']
})
export class ProfileLayoutComponent {
  acessToken!: string;
  user!: User
  listIdsString!: string[]

  constructor(private serviceUser: ServiceUserService){}

  ngOnInit(){
    this.acessToken = localStorage.getItem('token') ?? ""
    this.getUser()
  }

  getUser(){
    if(this.acessToken.length > 0){
      this.serviceUser.getUser(this.acessToken).subscribe(user => {
        this.user = user
        console.log(this.user)
        this.listIdsString = this.user._musicSaved ?? []
        console.log(this.listIdsString)
      })
    }
  }



}
