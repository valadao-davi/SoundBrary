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

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      senha: new FormControl('', [Validators.required])
    })
  }

  navigateCadastro() {
      this.router.navigate(['/cadastro']);
    }

  loginForm!: FormGroup;
  id?: String;
  senha?: String;


  navigateHome() {
    this.router.navigate(['/home']);
  }

  logar() {
    this.service.getUserByEmail(this.getEmailForm().value).subscribe(user => {
      this.senha = user.senha
      if(this.senha === this.getPasswordForm().value){
        this.id = user._id
        console.log(this.id)
        this.service.setUserId(this.id)
        this.navigateHome()
      }else{
        console.log("Senha inválida")
      }

    })
  }
  getEmailForm(){
    return this.loginForm.get('email')!
  }
  getPasswordForm(){
    return this.loginForm.get('senha')!
  }
}
