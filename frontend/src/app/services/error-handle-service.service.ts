import { Injectable } from '@angular/core';
import { AvisosService } from './avisos.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandleServiceService {

  constructor(private avisosService: AvisosService) { }

  handleErrorCode(code: any, type: string = ''){
    if(code.status === 404 && type === 'login'){
      this.avisosService.mostrarAvisoTemporario('Usuário não encontrado', 'error');
    }else if(code.status === 500) {
      this.avisosService.mostrarAvisoTemporario('Erro no servidor, tente novamente mais tarde...', 'error');
    }else if(code.status === 409){
      this.avisosService.mostrarAvisoTemporario('Campos inválidos!', 'error');
    }else if(code.status !== 200){
      this.avisosService.mostrarAvisoTemporario(`Erro desconhecido: ${code.status}`, 'error');
    }
    return throwError(() => new Error(code.error || 'Erro desconhecido'));

  }
}
