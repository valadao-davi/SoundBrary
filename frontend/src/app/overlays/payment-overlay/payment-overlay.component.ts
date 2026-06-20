import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-overlay',
  templateUrl: './payment-overlay.component.html',
  styleUrls: ['./payment-overlay.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class PaymentOverlayComponent {

  @Input() initialScreen = 'home';

currentScreen = '';

ngOnInit() {
  this.currentScreen = this.initialScreen;
}
  history: string[] = [];

  valor = '5,00';

onValorInput(event: Event): void {
  const inputValor = event.target as HTMLInputElement;

  const numeros = inputValor.value.replace(/\D/g, '');

  const valorFormatado = (Number(numeros) / 100).toLocaleString(
    'pt-BR',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  );

  this.valor = valorFormatado;
  inputValor.value = valorFormatado;
}

permitirSomenteNumeros(event: KeyboardEvent): void {
  const teclasPermitidas = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Tab'
  ];

  if (
    !/[0-9]/.test(event.key) &&
    !teclasPermitidas.includes(event.key)
  ) {
    event.preventDefault();
  }
}

get valorValido(): boolean {
  return /^\d+$/.test(this.valor) && Number(this.valor) > 0;
}

proximoPasso(): void {
  if (!this.valorValido) {
    return;
  }
  console.log('Valor válido:', this.valor);

  // próximo passo aqui
}

  dadosPessoaisForm: FormGroup = this.fb.group({
    nomeCompleto: [''],
    cpf: [''],
    telefone: [''],
    email: [''],
    cep: [''],
    numero: [''],
    cidade: [''],
    enderecoCobranca: [''],
    bairro: [''],
    complemento: ['']
  });
 
  constructor(private fb: FormBuilder) {}
 
  navigateTo(screen: string) {
    this.history.push(this.currentScreen);
    this.currentScreen = screen;
  }

  goBack() {
    if (this.history.length > 0) {
      this.currentScreen = this.history.pop()!;
    }
  }

  onConfirmar(): void {
    console.log(this.dadosPessoaisForm.value);
  }
}
 