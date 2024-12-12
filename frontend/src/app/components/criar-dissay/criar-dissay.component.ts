import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { catchError, debounceTime, Subject } from 'rxjs';
import { DefaultInstrument } from 'src/app/layouts/DefaultInstrument';
import { Dissay } from 'src/app/layouts/Dissay';
import { Instrument } from 'src/app/layouts/Instrument';
import { Music } from 'src/app/layouts/Music';
import { AvisosService } from 'src/app/services/avisos.service';
import { ErrorHandleServiceService } from 'src/app/services/error-handle-service.service';
import { ServiceDissayService } from 'src/app/services/service-dissay.service';
import { ServiceInstrumentsImageService } from 'src/app/services/service-instruments-image.service';
import { ServiceMusicService } from 'src/app/services/service-music.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-criar-dissay',
  templateUrl: './criar-dissay.component.html',
  styleUrls: ['./criar-dissay.component.css']
})
export class CriarDissayComponent {
 
  searchQuery!: string;
  tracksSearched!: Music[]
  idParam!: string;
  
  showResults: boolean = false;
  @Input() musicSelected: Music | undefined;
  private searchSubject: Subject<string> = new Subject<string>();
  maxLengthTitle: number = 100;
  maxLengthDescription: number = 1000;
  charCountTitle: number = 0;
  charCountDescription: number = 0;
  titleValue: string = '';
  descriptionValue: string = '';
  instrumentsDissay: Instrument[] = []
  toneDissay!: string;
  dissayEdit!: Dissay;
  accessToken!: string;
  isPrivate: boolean = false
  noMusic: boolean = false;

  showTooltip = false;

  constructor(private location: Location, private router: Router, private serviceSpotify: ServiceMusicService, private route: ActivatedRoute, private serviceDissay: ServiceDissayService, private avisosService: AvisosService, private handleError: ErrorHandleServiceService){
    this.searchSubject.pipe(debounceTime(500)).subscribe(value => {
      this.getTracksQuery(value)
    })

  }

  voltarPagina() {
    this.clearFields()
    this.location.back();
  }

  ngOnInit(){
    this.accessToken = localStorage.getItem('token') ?? ""

    this.route.queryParams.subscribe(params => {
      if(params['value']){
        this.serviceSpotify.getMusicById(params['value']).subscribe(music => {
          this.musicSelected = music
          this.titleValue = 'Dissay ' + music.name
          this.searchQuery = music.name

        })
      }else{
        console.log("No value")
      }
      console.log(params['id'])
      if(params['id'] ){
        this.serviceDissay.getDissayById(params['id']).subscribe(dissay => {
          this.dissayEdit = dissay
          this.serviceSpotify.getMusicById(this.dissayEdit.musicId).subscribe(music => {
            this.musicSelected = music

          })
          this.titleValue = this.dissayEdit.name
          this.instrumentsDissay = this.dissayEdit.instruments
          this.descriptionValue = this.dissayEdit.desc ?? ""
          this.toneDissay = this.dissayEdit.tone ?? ""
          this.serviceDissay.setList(this.instrumentsDissay)
        })
      }else{
        this.instrumentsDissay = this.serviceDissay.getInstruments()
        this.serviceDissay.getTone().subscribe(tone => {
          this.toneDissay = tone
        })
      }

    })
    console.log(this.instrumentsDissay)
  }
  

  activePrivate(){
    this.isPrivate = !this.isPrivate
    if(this.isPrivate === false && this.noMusic){
      this.noMusic = false
    }
  }

  activeNoMusic(){
    if(this.isPrivate === true){
      this.noMusic = !this.noMusic
      console.log(this.noMusic)
    }
  }

  getTracksQuery(query: string): void {
    if(query){
      this.serviceSpotify.getQueryMusic(query).subscribe(items => {
        this.tracksSearched = items
        this.showResults = items.length > 0
      })
    }else{
      this.tracksSearched = []
      this.showResults = false
    }
  }

  addInstrumentToList(newInstrument: Instrument){
    this.instrumentsDissay.push(newInstrument)
    console.log(this.instrumentsDissay)
  }
  selectMusic(id: string){
    if(this.tracksSearched && this.tracksSearched.length > 0){
      const foundTrack = this.tracksSearched.find(track => track.id === id)
      if(foundTrack){
        this.musicSelected = foundTrack
        this.showResults = false
        if(this.titleValue.length === 0) {
          this.titleValue = 'Dissay ' + foundTrack.name
        }
      }
    }
  }
  onSearchChange(value: string) {
    this.searchQuery = value;
    this.searchSubject.next(this.searchQuery);

   
  }

  onInput(event: Event, type: string): void {
    const target = event.target as HTMLTextAreaElement | HTMLInputElement
    if(target){
      if(type === 'title'){
        this.charCountTitle = target.value.length
        this.titleValue = target.value
      }else if(type === 'description'){
        this.charCountDescription = target.value.length
        this.descriptionValue = target.value
    }
  }
  }
  // Ajusta dinamicamente a altura do textarea conforme o conteúdo
  adjustHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto'; // Reseta a altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Define a nova altura
  }

  getTrackById(id: string){
    this.serviceSpotify.getMusicById(id).subscribe(music => {
      this.musicSelected = music
    })
  }

  publishDissay(){
  if(this.titleValue.length === 0 || this.instrumentsDissay.length === 0 || this.musicSelected === undefined){
      console.log("Dissay inválido")
    }else {
      console.log(this.accessToken)
      if(this.isPrivate === true){
        this.serviceDissay.createPrivateDissay(this.accessToken,{
          musicId: this.musicSelected.id,
          name: this.titleValue,
          description: this.descriptionValue ?? "",
          instruments: this.instrumentsDissay,
          tone: this.toneDissay ?? ""
        }).pipe(catchError((code)=> {
          return this.handleError.handleErrorCode(code)
        })).subscribe({
          next: (response) => {
            this.router.navigate([`/dissay/${response.insertedId}`]);

            this.clearFields()
            this.avisosService.mostrarAvisoTemporario("Dissay criado com sucesso!", "success")
           
            
          }
        });
      }else{
        console.log(this.toneDissay)
        this.serviceDissay.createDissay(this.accessToken,{
          musicId: this.musicSelected.id,
          name: this.titleValue,
          description: this.descriptionValue ?? "",
          instruments: this.instrumentsDissay,
          tone: this.toneDissay ?? ""
        }).pipe(catchError((code)=> {
          return this.handleError.handleErrorCode(code)
        })).subscribe({
          next: (response) => {
            this.router.navigate([`/dissay/${response.insertedId}`]);
            console.log(response)
            this.clearFields()
            this.avisosService.mostrarAvisoTemporario("Dissay criado com sucesso!", "success")
            
          }
        });
      }
      
    } 
  }

  publishPrivateNoMusic(){

    if(this.titleValue.length === 0 || this.instrumentsDissay.length === 0 || this.noMusic === false){
        console.log("Dissay inválido")
      }else {
        this.serviceDissay.createPrivateDissay(this.accessToken,{
          musicId: "no-id-music",
          name: this.titleValue,
          description: this.descriptionValue ?? "",
          instruments: this.instrumentsDissay,
          tone: this.toneDissay ?? "",
        }).pipe(catchError((code)=> {
          return this.handleError.handleErrorCode(code)
        })).subscribe({
          next: (response) => {
            console.log(response)
            this.router.navigate([`/dissay/${response.insertedId}`]);
            this.clearFields()
            this.avisosService.mostrarAvisoTemporario("Dissay criado com sucesso!", "success")
  
            
          }
        });
      } 
    }

  editDissay(){
    if(this.titleValue.length === 0 || this.instrumentsDissay.length === 0 || this.musicSelected === undefined){
        console.log("Dissay inválido")
      }else {
        if(this.dissayEdit && this.dissayEdit._id){
          this.serviceDissay.editDissay(this.accessToken, this.dissayEdit._id, {
            musicId: this.musicSelected.id,
            name: this.titleValue,
            description: this.descriptionValue ?? "",
            instruments: this.instrumentsDissay,
            tone: this.toneDissay ?? ""
          }).pipe(catchError((code)=> {
            return this.handleError.handleErrorCode(code)
          })).subscribe({
            next: (response) => {
              this.clearFields()
              this.avisosService.mostrarAvisoTemporario("Dissay editado com sucesso!", "success")
              this.router.navigate([`/dissay/${response.insertedId}`]);
              
            }
          });
        }
        
      } 
    }

  clearFields(){
    this.instrumentsDissay = []
    this.toneDissay = ""
    this.titleValue = '';
    this.descriptionValue = '';
    this.musicSelected = undefined
    this.searchQuery = '';
    this.serviceDissay.clearInstruments()
    console.log(this.instrumentsDissay)
  }
}