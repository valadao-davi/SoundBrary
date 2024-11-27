import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {
  // Usando BehaviorSubject para manter o estado
  private mensagemSubject = new BehaviorSubject<string>('');
  private tipoSubject = new BehaviorSubject<string>(''); // success | error
  private mostrarSubject = new BehaviorSubject<boolean>(false);
  private sumirSubject = new BehaviorSubject<boolean>(true);

  // Expondo os observáveis para os componentes se inscreverem
  mensagemAviso$ = this.mensagemSubject.asObservable();
  tipoAviso$ = this.tipoSubject.asObservable();
  mostrarAviso$ = this.mostrarSubject.asObservable();
  sumirAviso$ = this.sumirSubject.asObservable();

  private timeoutAviso: any;

  // Função para mostrar o aviso temporário
  mostrarAvisoTemporario(mensagem: string, tipo: string) {
    if (this.mostrarSubject.value) {
      clearTimeout(this.timeoutAviso);
    }

    this.mensagemSubject.next(mensagem);
    this.tipoSubject.next(tipo);
    this.mostrarSubject.next(true);
    this.sumirSubject.next(false);

    this.timeoutAviso = setTimeout(() => {
      this.sumirSubject.next(true);
      setTimeout(() => {
        this.mostrarSubject.next(false);
      }, 500);
    }, 3000); // Oculta o aviso após 3 segundos
  }
}
