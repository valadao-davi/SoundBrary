import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MusicaComponent } from './components/musica/musica.component';
import { AlbumComponent } from './components/album/album.component';
import { HeaderComponent } from './shared/header/header.component';
import { PerfilLateralComponent } from './shared/perfil-lateral/perfil-lateral.component';
import { AdsComponent } from './shared/ads/ads.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormularioCadastroComponent } from './components/formulario-cadastro/formulario-cadastro.component';
import { CadastroLayoutComponent } from './layouts/cadastro-layout/cadastro-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponent } from './components/usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MusicaComponent,
    AlbumComponent,
    HeaderComponent,
    PerfilLateralComponent,
    AdsComponent,
    FormularioCadastroComponent,
    CadastroLayoutComponent,
    UsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient(withFetch()), FormsModule, ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
