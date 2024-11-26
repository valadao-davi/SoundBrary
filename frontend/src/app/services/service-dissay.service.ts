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
  private toneDissay = new BehaviorSubject<string>(''); // Valor inicial


  constructor(private http: HttpClient) { }

  getAllDissays(): Observable<Dissay[]>{
    return this.http.get<Dissay[]>(`${this.API}`)
  }
  
  addInstrument(instrument: Instrument): void {
    this.instruments.push(instrument);
  }
  updateInstrument(instrument: Instrument, index:number): void{
    this.instruments[index] = instrument
  }
  getInstruments(): Instrument[] {
    return this.instruments
  }

  getTone() {
    return this.toneDissay.asObservable()
  }

  setTone(tone: string): void {
    this.toneDissay.next(tone)
  }

  deleteInstrument(instrumentName: string): void{
    const indexInstrument = this.instruments.findIndex(i => i.defaultInstrument.nameInstrument === instrumentName)
    if(indexInstrument !== -1){
      this.instruments.splice(indexInstrument, 1)
    }
  }

  getDissayByMusic(idMusic: string): Observable<Dissay[]>{
    return this.http.get<Dissay[]>(`${this.API}/getDissayByMusic/${idMusic}`)
  }

  getDissayById(id: string): Observable<Dissay>{
    return this.http.get<Dissay>(`${this.API}/getDissay/${id}`)
  }
}
