import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.get<Dissay[]>(`${this.API}/publicDissays`)
  }

  addInstrument(instrument: Instrument): void {
    this.instruments.push(instrument);
  }
  setList(instruments: Instrument[]): void {
    this.instruments = instruments
  }
  updateInstrument(instrument: Instrument, index:number): void{
    this.instruments[index] = instrument
  }
  clearInstruments(): void {
    this.instruments = []
  }
  
  searchDissays(query: string): Observable<Dissay[]> {
    return this.http.get<Dissay[]>(`${this.API}/publicDissays/${query}`)
  }

  getRecentDissays(): Observable<Dissay[]>{
    return this.http.get<Dissay[]>(`${this.API}/recentDissays`)
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

  createDissay(token: string,dissayData: any): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    return this.http.post<any>(`${this.API}/createDissay/${dissayData.musicId}`,  dissayData, {headers})
  }

  createPrivateDissay(token: string,dissayData: any): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.post<any>(`${this.API}/privateDissay/${dissayData.musicId}`,  dissayData, {headers})
  }
  deleteDissay(token: string, dissayId: string): Observable<void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.delete<void>(`${this.API}/deleteDissay/${dissayId}`, {headers})
  }

  editDissay(token: string, dissayId: string, dissayData: any): Observable<void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.put<void>(`${this.API}/editDissay/${dissayId}`, dissayData, {headers})
  }
}
