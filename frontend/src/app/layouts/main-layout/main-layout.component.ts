import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { ServiceUserService } from 'src/app/services/service-user.service';
import { User } from '../User';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent {

  accessToken!: string
  user!: User | null
  dataLoad: boolean = false

  constructor(private serviceUsers: ServiceUserService){}
  ngOnInit(){
    this.accessToken = localStorage.getItem('token') ?? ""
    console.log(this.accessToken)
    if(this.accessToken){
      this.serviceUsers.getUser(this.accessToken).pipe(
        catchError(error => {
          if (error.status === 404) {
            this.dataLoad = true
            this.user = null
          }
          return of(null);
        })
      ).subscribe(user => {
        this.user = user
        if(this.user !== null){
          this.dataLoad = true
          console.log(this.accessToken)
        }

      })

  }else{
    this.user = null
    this.dataLoad = true
  }
  }
}
