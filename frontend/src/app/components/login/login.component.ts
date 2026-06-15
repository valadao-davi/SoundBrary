import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError, of, throwError } from "rxjs";
import { AvisosService } from "src/app/services/avisos.service";
import { ErrorHandleServiceService } from "src/app/services/error-handle-service.service";
import { RedirectStorageService } from "src/app/services/redirect-storage.service";
import { ServiceUserService } from "src/app/services/service-user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private service: ServiceUserService, private avisosService: AvisosService, private handleError: ErrorHandleServiceService, private session: RedirectStorageService) {}

  mostrarAviso = false;
  sumirAviso = true;
  mensagemAviso = '';
  tipoAviso = '';
  timeoutAviso: any;
  redirectUrl: string | null = null;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userOrEmail: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
    })
    this.redirectUrl = this.session.getRedirectUrl();
  }

  navigateCadastro() {
      this.router.navigate(['/cadastro']);
    }

  loginForm!: FormGroup;
  token?: string;
  senha?: String;


  navigateHome() {
    if(this.redirectUrl){
      this.router.navigate([this.redirectUrl]);
    } else {  
    this.router.navigate(['/home']);
    }
  }

  logar() {
    let value = this.getUserOrEmail().value
    if(!value.includes('.com')){
      console.log("tentativa de login")

      value = "@" + this.getUserOrEmail().value
    }
    console.log(value)
    this.service.loginUser(value, this.getPasswordForm().value).pipe(
      catchError((code)=> {
        return this.handleError.handleErrorCode(code, 'login')
      })
    ).subscribe({
      next: (response) => {
        console.log(response)
      if(response && response.accessToken){
        this.token = response.accessToken
        localStorage.setItem('token', this.token)
        this.avisosService.mostrarAvisoTemporario('Login feito com sucesso!', 'success');
        this.navigateHome()
      }
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
