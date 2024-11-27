import { Component, OnInit } from '@angular/core';
import { AvisosService } from './services/avisos.service'; // ajuste o caminho conforme necessário

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mensagemAviso = '';
  tipoAviso = '';
  mostrarAviso = false;
  sumirAviso = true;

  constructor(private avisosService: AvisosService) {}

  ngOnInit(): void {
    // Inscrever-se nos observáveis do serviço
    this.avisosService.mensagemAviso$.subscribe((mensagem: string) => this.mensagemAviso = mensagem);
    this.avisosService.tipoAviso$.subscribe((tipo: string) => this.tipoAviso = tipo);
    this.avisosService.mostrarAviso$.subscribe((mostrar: boolean) => this.mostrarAviso = mostrar);
    this.avisosService.sumirAviso$.subscribe((sumir: boolean) => this.sumirAviso = sumir);
  }
}
