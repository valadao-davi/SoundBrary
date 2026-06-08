import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private menuRetraidoSubject = new BehaviorSubject<boolean>(false);

  menuRetraido$ = this.menuRetraidoSubject.asObservable();

  toggleMenu() {
    this.menuRetraidoSubject.next(
      !this.menuRetraidoSubject.value
    );
  }

  setMenuRetraido(valor: boolean) {
    this.menuRetraidoSubject.next(valor);
  }
}