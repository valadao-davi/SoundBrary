import { User } from './../User';
import { ServiceUserService } from './../../services/service-user.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class LoginLayoutComponent {


  listaUsers: User[] = []

  constructor(private service: ServiceUserService){
  }

  ngOnInit(): void {
   this.service.getUsuariosLista().subscribe((listaUsers => {
    this.listaUsers = listaUsers
   }))
  }

}
