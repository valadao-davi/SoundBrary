import { User } from './../User';
import { Component } from '@angular/core';
import { ServiceUserService } from 'src/app/services/service-user.service';

@Component({
  selector: 'app-cadastro-layout',
  templateUrl: './cadastro-layout.component.html',
  styleUrls: ['./cadastro-layout.component.css']
})
export class CadastroLayoutComponent {

  textoBotao = "Cadastrar"

  constructor(private service: ServiceUserService){}

  async cadastrarUsuario(user: User){
    const userJson = {
      "name": `${user.name}`,
      "email": `${user.email}`,
      "password": `${user.password}`
    }
    console.log(userJson)
    this.service.createUser(userJson).subscribe()
  }

}
