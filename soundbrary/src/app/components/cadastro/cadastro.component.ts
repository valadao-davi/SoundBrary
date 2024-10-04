import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    if(this.emailUser){
      this.invalidEmail = true
      return;
    }
    if(this.senhasNaoConferem){
      return;
    }

    this.service.getUserByEmail(this.getEmailForm().value).subscribe({
      next: (user) => {
        this.emailUser = user.email
        this.invalidEmail = true
        return;
      },
      error: (err) => {
        console.log('aqui')
        if(err.status === 404) {
          console.log('usuario nao encontrado')
          this.cadastrarUsuario(this.cadastroForm.value)
          this.invalidEmail = false
          return;
        }else {
          console.error('erro inesperado', err)
        }
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

  async cadastrarUsuario(user: User){
    const userJson = {
      "name": `${user.name}`,
      "email": `${user.email}`,
      "senha": `${user.senha}`
    }
    console.log(userJson)
    this.service.createUser(userJson).subscribe()
  }
}
