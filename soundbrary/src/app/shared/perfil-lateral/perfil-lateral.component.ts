import { Component } from '@angular/core';
import { User } from 'src/app/layouts/User';
import { ServiceUserService } from 'src/app/services/service-user.service';

@Component({
  selector: 'app-perfil-lateral',
  templateUrl: './perfil-lateral.component.html',
  styleUrls: ['./perfil-lateral.component.css']
})
export class PerfilLateralComponent {

  accessToken!: string;
  user!: User;

  constructor(private serviceUsers: ServiceUserService){

  }

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('token') ?? ""
    if(this.accessToken.length > 0) {
      this.serviceUsers.getUser(this.accessToken).subscribe(user => {
        this.user = user
      })
    }

  }


}
