import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { User } from 'src/app/layouts/User';
import { ServiceUserService } from 'src/app/services/service-user.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-perfil-lateral',
  templateUrl: './perfil-lateral.component.html',
  styleUrls: ['./perfil-lateral.component.css']
})
export class PerfilLateralComponent {

  @Input() user!: User | null

  constructor(private router: Router, private serviceUsers: ServiceUserService){}

    navigatePerfil() {
      if(this.user === null){
        this.router.navigate(['/login'])
        return
      }
      this.router.navigate([`/perfil/${this.user.userName}`]);

    }

    navigateCreate() {
      if(this.user === null){
        this.router.navigate(['/login'])
        return
      }
      this.router.navigate(['/criar-dissay']);
    }



}
