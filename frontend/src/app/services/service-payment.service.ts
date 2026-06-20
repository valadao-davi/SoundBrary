import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { PaymentInfo } from '../layouts/User';
import { PixInfo } from '../layouts/PixInfo';

@Injectable({
  providedIn: 'root'
})
export class ServicePaymentService {
  private readonly API = `${environment.apiUrl}/payment`;

  constructor(private http: HttpClient) {}

  generatePixByUser(userName: string, value: number): Observable<PixInfo>{
    return this.http.post<PixInfo>(`${this.API}/generate-pix`, {
      username: userName,
      value: value
    });
  }
}


