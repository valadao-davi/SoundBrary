import { Component } from '@angular/core';

@Component({
  selector: 'app-dissay',
  templateUrl: './dissay.component.html',
  styleUrls: ['./dissay.component.css']
})
export class DissayComponent {

  respostas = [
    { nome: 'Mariana R.', data: '27/08/2024 11:05pm', texto: 'Acho que os efeitos da guitarra estão na ordem errada.', para: 'Teste', showInput: false },
    { nome: 'Carlos A.', data: '27/08/2024 11:10pm', texto: 'Concordo com a Mariana!', para: 'aaa', showInput: false }
    // Adicione mais respostas conforme necessário
  ];
  respostaAbertaIndex: number | null = null;

  notificationVisible!: boolean;
  cancelNotificationVisible!: boolean;



  adjustHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto'; // Reseta a altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Define a nova altura

  }


  toggleResposta(index: number) {
    if (this.respostaAbertaIndex === index) {
      // Se a resposta já está aberta, fechá-la
      this.respostaAbertaIndex = null;
    } else {
      // Fechar a resposta anterior, se houver
      this.respostaAbertaIndex = index;
    }
  }

  isRespostaOpen(index: number): boolean {
    return this.respostaAbertaIndex === index;
  }

  publicarResposta(index: number, texto: string) {
    if (texto) {
      console.log(`Publicar resposta para a resposta ${index}: ${texto}`);
      if (!this.cancelNotificationVisible) { // Verifica se a notificação de cancelamento não está visível
        this.notificationVisible = true;
        setTimeout(() => {
          this.notificationVisible = false; // Ocultar notificação após 3 segundos
        }, 3000);
      }
      this.cancelarResposta(index);
    }
  }

  cancelarResposta(index: number) {
    this.respostaAbertaIndex = null;
    this.respostas[index].showInput = false; // Fechar o campo de resposta
    if (!this.notificationVisible) { // Verifica se a notificação de publicação não está visível
      this.cancelNotificationVisible = true;
      setTimeout(() => {
        this.cancelNotificationVisible = false; // Ocultar notificação após 3 segundos
      }, 3000);}
    }
}
