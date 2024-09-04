import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './screens/login-screen/components/input/input.component';
import { LoginViewComponent } from './screens/login-screen/login-view/login-view.component';
import { CadastroViewComponent } from './screens/login-screen/cadastro-view/cadastro-view.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    LoginViewComponent,
    CadastroViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
