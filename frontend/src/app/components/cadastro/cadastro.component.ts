import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { User } from 'src/app/layouts/User';
import { of } from 'rxjs';
import { ServiceUserService } from 'src/app/services/service-user.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  constructor(private router: Router, private service: ServiceUserService) {}

  falha!: boolean;
  sucesso!: boolean;

  ngOnInit(): void {
        this.cadastroForm = new FormGroup({
          id: new FormControl(''),
          username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
          name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
          email: new FormControl('', [Validators.required, Validators.email]),
          senha: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)] ),
          confirmaSenha: new FormControl('', [Validators.required])
        })

        this.getUserNameForm().valueChanges.subscribe(()=> {
          this.invalidUser = false
        })

        this.getEmailForm().valueChanges.subscribe(() => {
          this.invalidEmail = false;
        })
      }

  navigateLogin() {
    this.router.navigate(['/login']);
  }

  cadastroForm!: FormGroup;
  emailUser!: string;
  invalidEmail!: boolean;
  senhasNaoConferem!: boolean;
  inputValue!: String;
  invalidUser = false;

  onChange(event: Event): void {
    this.senhasNaoConferem = this.comparaSenhas(this.cadastroForm);
  }

  comparaSenhas(formGroup: FormGroup) {
    const senha = formGroup.get ('senha')?.value;
    const confirmaSenha = formGroup.get ('confirmaSenha')?.value;
    return senha === confirmaSenha ? false : true;
  }


  submit() {
    this.emailUser = ''
    if(this.cadastroForm.invalid){
      return;
    }
    if(this.senhasNaoConferem){
      return;
    }

    const userJson = {
      "userName": this.getUserNameForm().value,
      "name": this.getNameForm().value,
      "email": this.getEmailForm().value,
      "password": this.getPasswordForm().value,
    }
    this.service.createUser(userJson).pipe(
      catchError((code)=> {
        if(code.status === 409){
          return throwError(()=> {
            console.log(code.error.account)
            if(code.error.account === "email"){
              console.log("awui")
              this.invalidEmail = true
            }else if(code.error.account === "user"){
              this.invalidUser = true
            }
          })
        }
        else if(code.status === 500){
          return throwError(()=> alert("Erro no servidor: " + code.error))
        }else if(code.status !== 200){
          return throwError(()=> alert("Erro desconhecido: " + code.error))
        }
        return of(null)
      })
    ).subscribe({
      next: (response) => {
          console.log('Usuário criado com sucesso: ', response);
          this.navigateLogin();
      }
    });
  }

  getUserNameForm(){
    return this.cadastroForm.get('username')!
  }
  getNameForm(){
    return this.cadastroForm.get('name')!
  }
  getEmailForm(){
    return this.cadastroForm.get('email')!
  }
  getPasswordForm(){
    return this.cadastroForm.get('senha')!
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
