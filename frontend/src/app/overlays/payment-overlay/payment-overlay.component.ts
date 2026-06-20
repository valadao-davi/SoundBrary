import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServiceUserService } from 'src/app/services/service-user.service';
import { PaymentInfo } from 'src/app/layouts/User';
import { catchError } from 'rxjs';
import { ErrorHandleServiceService } from 'src/app/services/error-handle-service.service';
import { AvisosService } from 'src/app/services/avisos.service';
import { ServicePaymentService } from 'src/app/services/service-payment.service';
import { PixInfo } from 'src/app/layouts/PixInfo';

@Component({
  selector: 'app-payment-overlay',
  templateUrl: './payment-overlay.component.html',
  styleUrls: ['./payment-overlay.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class PaymentOverlayComponent {
  constructor(private fb: FormBuilder, private userService: ServiceUserService, private handleError: ErrorHandleServiceService,private avisosService: AvisosService, private paymentService: ServicePaymentService) {}

  @Input() initialScreen = 'home';
  @Input() usernameDissay!: string;
  @Input() closeOverlay!: () => void
  accessToken!: string;
  currentScreen = '';
  history: string[] = [];
  valor = '5,00';
  valorNumeroFormato!: number;
  
  paymentInfoOriginal: PaymentInfo | null = null;
  pixInfo: PixInfo | null = null;
  paymentForm: FormGroup = this.fb.group({
    pixType: [''],
    pixKey: [''],
    formalName: [''],
    city: ['']
  });

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

  ngOnInit() {
    this.currentScreen = this.initialScreen;
    this.accessToken = localStorage.getItem('token') ?? ""
    if(this.accessToken) {
      console.log("chamando inf de pagamento")
      this.carregarPaymentInfo();
    }
    console.log(this.usernameDissay);
    
  }
 
  carregarPaymentInfo(): void {
    this.userService.getUser(this.accessToken).pipe(
      catchError((error) => {
        return this.handleError.handleErrorCode(error);
      })
    ).subscribe({
      next: (user) => {
        console.log("novo payment info: " + user.paymentInfo?.pixKey)
        if(user.paymentInfo){
          this.paymentInfoOriginal = {
            formalName: user.paymentInfo.formalName,
            city: user.paymentInfo.city,
            pixKey: user.paymentInfo.pixKey
          }
          this.paymentForm.patchValue(this.paymentInfoOriginal);
        }
      }
    });
  }
  get podeSalvar(): boolean {
    const pixKey = this.paymentForm.get('pixKey')?.value?.trim();
    const formalName = this.paymentForm.get('formalName')?.value?.trim();
    const city = this.paymentForm.get('city')?.value?.trim();

    const todosPreenchidos =
      !!pixKey &&
      !!formalName &&
      !!city;

    if (!todosPreenchidos) {
      return false;
    }

    if (!this.paymentInfoOriginal) {
      return true;
    }

    return (
      pixKey !== this.paymentInfoOriginal.pixKey ||
      formalName !== this.paymentInfoOriginal.formalName ||
      city !== this.paymentInfoOriginal.city
    );
  }

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
    this.valorNumeroFormato =  Number(
      this.valor.replace(/\./g, '').replace(',', '.')
    );
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

  
  
 
 
  navigateTo(screen: string) {
    this.history.push(this.currentScreen);
    this.currentScreen = screen;
  }

  navigateGeneratePix() {
    this.paymentService.generatePixByUser(this.usernameDissay, this.valorNumeroFormato).pipe(
          catchError((code)=> {
            return this.handleError.handleErrorCode(code)
          })
        ).subscribe({
          next: (pixInfo) => {
            this.pixInfo = pixInfo;
            console.log(pixInfo.copyPaste);
            this.history.push(this.currentScreen);
            this.currentScreen = "pix";
            this.avisosService.mostrarAvisoTemporario("Pix gerado com sucesso!", "success")
          }
        })
    }
  
  copiarPix(): void {
    if (!this.pixInfo?.copyPaste) {
      return;
    }

    navigator.clipboard.writeText(this.pixInfo.copyPaste);

    this.avisosService.mostrarAvisoTemporario(
      'Código PIX copiado!',
      'success'
    );
  }  
  goBack() {
    if (this.history.length > 0) {
      this.currentScreen = this.history.pop()!;
    }
  }

  onConfirmar(): void {
    console.log(this.dadosPessoaisForm.value);
  }

  setPaymentInfo(): void {
    const paymentInfo: PaymentInfo = {
      formalName: this.paymentForm.get('formalName')?.value ?? '',
      city: this.paymentForm.get('city')?.value ?? '',
      pixKey: this.paymentForm.get('pixKey')?.value ?? ''
    };
    this.userService.setPaymentInfo(this.accessToken, paymentInfo).pipe(
          catchError((code)=> {
            return this.handleError.handleErrorCode(code)
          })
        ).subscribe({
          next: () => {
            this.paymentInfoOriginal = { ...paymentInfo };
            console.log(this.paymentInfoOriginal);
            this.avisosService.mostrarAvisoTemporario("Informações de pagamento editadas com sucesso!", "success")
            this.closeOverlay()
          }
        })
  }
  confirmPayment(): void {
    this.goBack()
    this.closeOverlay()
    this.avisosService.mostrarAvisoTemporario("O criador de conteúdo agradece!", "success")
  }
}

