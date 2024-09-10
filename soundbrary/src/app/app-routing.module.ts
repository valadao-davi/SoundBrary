import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from 'src/app/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { MusicaComponent } from './components/musica/musica.component';
import { AlbumComponent } from './components/album/album.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';


const routes: Routes = [
  {path: '', component: MainLayoutComponent, children:[
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'musica', component: MusicaComponent},
    {path: 'album', component: AlbumComponent},
    {path: 'artista', component: AlbumComponent},
  ]
  },

  {path: 'login', component: AuthLayoutComponent, children: [
    {path: '',  component: LoginComponent}
  ]},

  {path: 'cadastro', component: AuthLayoutComponent, children: [
    {path: '',  component: CadastroComponent}
  ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
