import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from 'src/app/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { MusicaComponent } from './components/musica/musica.component';
import { AlbumComponent } from './components/album/album.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { DissayComponent } from './components/dissay/dissay.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { ProfileLayoutComponent } from './layouts/profile-layout/profile-layout.component';
import { CriarDissayComponent } from './components/criar-dissay/criar-dissay.component';
import { InstrumentoOverlayComponent } from './overlays/instrumento-overlay/instrumento-overlay.component';





const routes: Routes = [
  {path: '', component: MainLayoutComponent, children:[
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'musica/:id', component: MusicaComponent},
    {path: 'dissay/:id', component: DissayComponent},
    {path: 'criar-dissay', component: CriarDissayComponent},
    {path: 'album/:id', component: AlbumComponent},
    {path: 'artista/:id', component: ArtistaComponent},
    {path: 'user/:id', component: UsuarioComponent},
    {path: 'search/:query', component: SearchComponent}
  ]
  },

  {path: 'login', component: AuthLayoutComponent, children: [
    {path: '',  component: LoginComponent}
  ]},

  {path: 'cadastro', component: AuthLayoutComponent, children: [
    {path: '',  component: CadastroComponent}
  ]},

  {path: 'perfil/:query', component: ProfileLayoutComponent},

  {path: 'overlay', component: InstrumentoOverlayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
