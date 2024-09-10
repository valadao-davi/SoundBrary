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
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

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
    MainLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
