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
  }

  submit() {
    if(this.user){
      this.invalidEmail = true
      return;
    }
    if(this.cadastroForm.invalid){
      return;
    }
    this.service.getUserByEmail(this.getEmailForm().value).subscribe((user=> {
      this.user = user.email
    }))
    this.onSubmit.emit(this.cadastroForm.value)
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
