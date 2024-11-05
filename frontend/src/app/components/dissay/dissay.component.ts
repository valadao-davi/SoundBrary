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
  mostrarAviso = false;
  sumirAviso = true;
  mensagemAviso = '';
  tipoAviso = '';
  timeoutAviso: any;


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
      this.mostrarAvisoTemporario('Resposta publicada com sucesso!', 'success');
      this.respostaAbertaIndex = null;
      this.respostas[index].showInput = false; // Fechar o campo de resposta
    }
  }

  cancelarResposta(index: number, texto: string) {
    this.respostaAbertaIndex = null;
    this.respostas[index].showInput = false; // Fechar o campo de resposta
    if (texto) {
      if (this.mostrarAviso) {
        clearTimeout(this.timeoutAviso);
      }
      this.mostrarAvisoTemporario('Resposta cancelada.', 'error');
    }
    }

    mostrarAvisoTemporario(mensagem: string, tipo: string) {
      if (this.mostrarAviso) {
        clearTimeout(this.timeoutAviso);
      }
      this.mensagemAviso = mensagem;
      this.tipoAviso = tipo;
      this.mostrarAviso = true;
      this.sumirAviso = false;
      console.log("chegou")
      this.timeoutAviso = setTimeout(() => {
        this.sumirAviso = true;
        setTimeout(() => {
          this.mostrarAviso = false;
          console.log("foi")
        }, 500)
      }, 3000); // Oculta o aviso após 3 segundos

    }
}
