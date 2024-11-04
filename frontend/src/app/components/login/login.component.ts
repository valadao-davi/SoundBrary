import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ServiceUserService } from "src/app/services/service-user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private service: ServiceUserService) {}

  sucesso!: boolean;
  falha!: boolean;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userOrEmail: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
    })
  }

  navigateCadastro() {
      this.router.navigate(['/cadastro']);
    }

  loginForm!: FormGroup;
  token?: string;
  senha?: String;


  navigateHome() {
    this.router.navigate(['/home']);
  }

  logar() {
    let value = this.getUserOrEmail().value
    if(!value.includes('.com')){
      console.log("aqui")
      value = "@" + this.getUserOrEmail().value
    }
    console.log(value)
    this.service.loginUser(value, this.getPasswordForm().value).subscribe((response) => {
      if(response.accessToken){
        this.token = response.accessToken
        localStorage.setItem('token', this.token)
        this.navigateHome()
        this.sucessoNotification()
      }else{
        console.error("Token não encontrado")
        this.falhaNotification()
      }
    }
    )
  }
  getUserOrEmail(){
    return this.loginForm.get('userOrEmail')!
  }
  getPasswordForm(){
    return this.loginForm.get('senha')!
  }


  sucessoNotification() {
    if (!this.falha) { // Verifica se a notificação de publicação não está visível
      this.sucesso = true;
      setTimeout(() => {
        this.sucesso = false; // Ocultar notificação após 3 segundos
      }, 3000);}
    }

  falhaNotification() {
    if (!this.sucesso) { // Verifica se a notificação de publicação não está visível
      this.falha = true;
      setTimeout(() => {
        this.falha = false; // Ocultar notificação após 3 segundos
      }, 3000);}
    }
}
