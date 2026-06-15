import { Component, OnInit, Optional } from '@angular/core';
import { AvisosService } from './services/avisos.service'; // ajuste o caminho conforme necessário
import { RedirectStorageService } from './services/redirect-storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ServiceUserService } from './services/service-user.service';

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

  constructor(
    private avisosService: AvisosService,
    private router: Router,
    private authService: ServiceUserService,
    private sessionRedirect: RedirectStorageService
  ) {}

  ngOnInit(): void {
    // Inscrever-se nos observáveis do serviço
    this.avisosService.mensagemAviso$.subscribe((mensagem: string) => this.mensagemAviso = mensagem);
    this.avisosService.tipoAviso$.subscribe((tipo: string) => this.tipoAviso = tipo);
    this.avisosService.mostrarAviso$.subscribe((mostrar: boolean) => this.mostrarAviso = mostrar);
    this.avisosService.sumirAviso$.subscribe((sumir: boolean) => this.sumirAviso = sumir);

    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(e => {
      const url = e.urlAfterRedirects;
      const isAuthenticated = this.authService && typeof this.authService.isAuthenticated === 'function'
        ? this.authService.isAuthenticated()
        : !!localStorage.getItem('auth_token');
      this.sessionRedirect.saveIfLoggedOut(url, isAuthenticated);
    });
  }
}
