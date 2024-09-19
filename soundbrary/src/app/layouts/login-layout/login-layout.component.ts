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
  resetarListar(): void {
    this.service.getUsuariosLista().subscribe((listaUsers => {
      this.listaUsers = listaUsers
    }))
  }
  ngOnInit(): void {
   this.resetarListar()
  }
  async delete(user: User){
    const userJson = {
      "id": `${user._id}` || ''
    }
    console.log(userJson.id)
    if(userJson.id != '') {
      this.service.deleteUser(userJson.id).subscribe({
        next: () => {
          this.listaUsers = this.listaUsers.filter(u => u._id !== user._id)
          this.resetarListar()
        },
        error: (err) => {
          console.error("Erro ao deletar", err)
        }
      })
    }
  }
}
