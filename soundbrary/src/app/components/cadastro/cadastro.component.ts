import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { User } from 'src/app/layouts/User';
import { ServiceUserService } from 'src/app/services/service-user.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  constructor(private router: Router, private service: ServiceUserService) {}

  ngOnInit(): void {
        this.cadastroForm = new FormGroup({
          id: new FormControl(''),
          name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
          email: new FormControl('', [Validators.required, Validators.email]),
          senha: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)] ),
          confirmaSenha: new FormControl('', [Validators.required])
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
      "name": this.getNameForm().value,
      "email": this.getEmailForm().value,
      "password": this.getPasswordForm().value,
    }
    this.service.createUser(userJson).pipe(
      catchError((code)=> {
        if(code.status === 400){
           alert("Erro: " + code.error)
        }else if(code.status === 500){
          alert("Erro no servidor: " + code.error)
        }else if(code.status !== 201){
          alert("Erro desconhecido")
        }
        return throwError(() => code)
      })
    ).subscribe({
      next:(response) => {
        console.log('Usuário criado com sucesso: ', response)
      }
    })
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


}
