import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/layouts/User';
import { ServiceUserService } from 'src/app/services/service-user.service';

@Component({
  selector: 'app-formulario-cadastro',
  templateUrl: './formulario-cadastro.component.html',
  styleUrls: ['./formulario-cadastro.component.css']
})
export class FormularioCadastroComponent {
  @Output() onSubmit = new EventEmitter<User>()

  @Input() textoBotao!: string;

  cadastroForm!: FormGroup;
  user!: string
  invalidEmail!: boolean

  constructor (private service: ServiceUserService) {}

  ngOnInit(): void {
    this.cadastroForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
    })

    this.getEmailForm().valueChanges.subscribe(() => {
      this.invalidEmail = false;
    })
  }


  submit() {
    console.log('ok')
    this.user = ''
    if(this.user){
      this.invalidEmail = true
      return;
    }
    if(this.cadastroForm.invalid){
      return;
    }
    this.service.getUserByEmail(this.getEmailForm().value).subscribe({
      next: (user) => {
        this.user = user.email
        this.invalidEmail = true
        return;
      },
      error: (err) => {
        console.log('aqui')
        if(err.status === 404) {
          console.log('usuario nao encontrado')
          this.onSubmit.emit(this.cadastroForm.value)
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
    return this.cadastroForm.get('password')!
  }
}
