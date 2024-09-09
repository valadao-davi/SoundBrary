import { User } from './../User';
import { ServiceUserService } from './../../services/service-user.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css']
})
export class LoginLayoutComponent {

  @Input() user: User = {
    nome: '',
    email: "",
    senha: ""
  }

  listaUsers: User[] = [
    {
      nome: "davi",
      email: "davinovo.valadao@gmail.com",
      senha: "123456"
    }
  ]
 constructor(private service: ServiceUserService){

 }
 ngOnInit(): void{
  this.service.listUsuarios().subscribe((listaUsers)=> {
      this.listaUsers = listaUsers
  })
 }
}
