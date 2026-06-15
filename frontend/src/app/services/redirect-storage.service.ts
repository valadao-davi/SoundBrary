import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RedirectStorageService {
  private readonly STORAGE_KEY = 'session:redirect_url';

  constructor(private router: Router) {}

  /** Salva a URL somente se o usuário estiver deslogado */
  saveIfLoggedOut(url: string, isAuthenticated: boolean): void {
    if (!isAuthenticated && url !== '/login' && url !== '/cadastro') {
      try {
        localStorage.setItem(this.STORAGE_KEY, url);
        console.log('RedirectStorageService: URL salva →', url);
      } catch (e) {
        // ignore storage errors (private mode, quota, etc.)
      }
    }
  }

  getRedirectUrl(): string | null {
    try {
      return localStorage.getItem(this.STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  /** Redireciona após login/cadastro e limpa o valor salvo */
  redirectAfterAuth(fallback: string = '/'): void {
    const url = this.getRedirectUrl();
    this.clear();
    this.router.navigateByUrl(url || fallback);
  }

  clear(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (e) {}
  }
}
