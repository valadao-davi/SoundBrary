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
import { MMiniComponent } from './components/m-mini/m-mini.component';
import { DissayComponent } from './components/dissay/dissay.component';
import { LeftInfoComponent } from './components/left-info/left-info.component';
import { InstrumentoMini2Component } from './components/instrumento-mini-2/instrumento-mini-2.component';
import { SearchComponent } from './components/search/search.component';
import { DuracaoPipe } from './pipes/duracao.pipe';
import { DissayItemComponent } from './components/dissay-item/dissay-item.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ArtistaComponent } from './components/artista/artista.component';
import { ProfileLayoutComponent } from './layouts/profile-layout/profile-layout.component';
import { CriarDissayComponent } from './components/criar-dissay/criar-dissay.component';
import { CriarDissayCardsComponent } from './components/criar-dissay-cards/criar-dissay-cards.component';
import { InstrumentoOverlayComponent } from './overlays/instrumento-overlay/instrumento-overlay.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { LimitInputDirective } from './directives/limit-input.directive';
import { SearchOverlayComponent } from './overlays/search-overlay/search-overlay.component';



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
    InstrumentoMiniComponent,
    MMiniComponent,
    DissayComponent,
    LeftInfoComponent,
    InstrumentoMini2Component,
    SearchComponent,
    DuracaoPipe,
    DissayItemComponent,
    CapitalizePipe,
    ArtistaComponent,
    ProfileLayoutComponent,
    CriarDissayComponent,
    CriarDissayCardsComponent,
    InstrumentoOverlayComponent,
    LimitInputDirective,
    SearchOverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    OverlayModule,
    PortalModule
  ],
  providers: [provideHttpClient(withFetch()), FormsModule, ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
