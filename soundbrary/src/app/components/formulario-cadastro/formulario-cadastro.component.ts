import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-cadastro',
  templateUrl: './formulario-cadastro.component.html',
  styleUrls: ['./formulario-cadastro.component.css']
})
export class FormularioCadastroComponent {

  @Input() textoBotao!: string;

  cadastroForm!: FormGroup;

  constructor () {}

  ngOnInit(): void {
    this.cadastroForm = new FormGroup({
      id: new FormControl(''),
      user: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
    })
  }

  submit() {
    if(this.cadastroForm.invalid){
      return;
    }
    console.log('Cadastro com sucesso')
  }

  getUserForm(){
    return this.cadastroForm.get('user')!
  }
  getEmailForm(){
    return this.cadastroForm.get('email')!
  }
  getPasswordForm(){
    return this.cadastroForm.get('password')!
  }
}
