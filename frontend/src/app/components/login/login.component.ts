import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AvisosService } from "src/app/services/avisos.service";
import { ServiceUserService } from "src/app/services/service-user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private service: ServiceUserService, private avisosService: AvisosService) {}

  mostrarAviso = false;
  sumirAviso = true;
  mensagemAviso = '';
  tipoAviso = '';
  timeoutAviso: any;

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
      console.log("tentativa de login")

      value = "@" + this.getUserOrEmail().value
    }
    console.log(value)
    this.service.loginUser(value, this.getPasswordForm().value).subscribe((response) => {
      if(response.accessToken){
        this.token = response.accessToken
        localStorage.setItem('token', this.token)
        this.avisosService.mostrarAvisoTemporario('Login feito com sucesso!', 'success');
        console.log("deu bom")
        this.navigateHome()
      }else{
        this.avisosService.mostrarAvisoTemporario('O login falhou', 'error');
        console.error("Token não encontrado")
        console.log("deu erro")
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

}
