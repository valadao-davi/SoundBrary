import { Router } from '@angular/router';
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

  constructor(private router: Router, private serviceUsers: ServiceUserService){}

    navigatePerfil() {
      if(this.accessToken === ""){
        this.router.navigate(['/login'])
        return
      }
      this.router.navigate([`/perfil/${this.user.name}`]);
      
    }



  ngOnInit(): void {
    this.accessToken = localStorage.getItem('token') ?? ""
    console.log(this.accessToken)
    if(this.accessToken){
      this.serviceUsers.getUser(this.accessToken).subscribe(user => {
        this.user = user
        console.log(this.user)

      })

  }
  }




}
