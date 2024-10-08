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
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './components/login/login.component';
import { DMiniComponent } from './components/d-mini/d-mini.component';
import { InstrumentoMiniComponent } from './components/instrumento-mini/instrumento-mini.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MusicaComponent,
    AlbumComponent,
    HeaderComponent,
    PerfilLateralComponent,
    AdsComponent,
    CadastroComponent,
    UsuarioComponent,
    MainLayoutComponent,
    LoginComponent,
    DMiniComponent,
    InstrumentoMiniComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [provideHttpClient(withFetch()), FormsModule, ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
