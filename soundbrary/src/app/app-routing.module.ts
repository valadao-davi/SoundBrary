import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/components/login/login.component';
import { AuthLayoutComponent } from 'src/layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  {path: 'auth', component: AuthLayoutComponent, children:[
    {path: 'login', component: LoginComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
