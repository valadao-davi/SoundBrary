import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroLayoutComponent } from 'src/app/layouts/cadastro-layout/cadastro-layout.component';
import { LoginLayoutComponent } from 'src/app/layouts/login-layout/login-layout.component';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { MusicaComponent } from './components/musica/musica.component';
import { AlbumComponent } from './components/album/album.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children:[
    {path: 'home', component: HomeComponent},
    {path: 'musica', component: MusicaComponent},
    {path: 'album', component: AlbumComponent},
    {path: 'artista', component: AlbumComponent},
    {path: 'user/:id', component: UsuarioComponent}
  ]
  },

  {path: 'login', component: LoginLayoutComponent},

  {path: 'cadastro', component: CadastroLayoutComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
