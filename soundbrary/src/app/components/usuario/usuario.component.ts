import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/layouts/User';
import { ServiceUserService } from 'src/app/services/service-user.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  user?: User
  id: string = '';

  constructor(private route: ActivatedRoute, private serviceUser: ServiceUserService){}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? ''
    this.serviceUser.getUser(this.id).subscribe(user => {
      this.user = user
    })
  }
}
