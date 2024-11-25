import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dissay } from '../layouts/Dissay';
import  {Instrument} from '../layouts/Instrument'

@Injectable({
  providedIn: 'root'
})
export class ServiceDissayService {
  private readonly API = 'http://localhost:3000/dissays'
  private instruments: Instrument[] = [];

  constructor(private http: HttpClient) { }

  getAllDissays(): Observable<Dissay[]>{
    return this.http.get<Dissay[]>(`${this.API}`)
  }
  
  addInstrument(instrument: Instrument): void {
    this.instruments.push(instrument);
  }
  getInstruments(): Instrument[] {
    return this.instruments
  }

  getDissayByMusic(idMusic: string): Observable<Dissay[]>{
    return this.http.get<Dissay[]>(`${this.API}/getDissayByMusic/${idMusic}`)
  }

  getDissayById(id: string): Observable<Dissay>{
    return this.http.get<Dissay>(`${this.API}/getDissay/${id}`)
  }
}
