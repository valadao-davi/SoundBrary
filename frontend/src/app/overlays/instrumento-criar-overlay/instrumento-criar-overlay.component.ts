import { Component, effect, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DefaultInstrument } from 'src/app/layouts/DefaultInstrument';
import { Effect } from 'src/app/layouts/Effect';
import { Instrument } from 'src/app/layouts/Instrument';

@Component({
  selector: 'app-instrumento-criar-overlay',
  templateUrl: './instrumento-criar-overlay.component.html',
  styleUrls: ['./instrumento-criar-overlay.component.css']
})
export class InstrumentoCriarOverlayComponent {
  @Input() instrument!: DefaultInstrument;
  nomeEscrito: boolean = false; // Inicializa a variável como falsa
  parametroEscrito: boolean = false; // Inicializa a variável como falsa
  valorEscrito: boolean = false; // Inicializa a variável como falsa
  efeito: Effect = {name: '', parameters: {}}
  instrumentMade!: Instrument
  editMode: boolean = false;

  chave: string = '';
  valor: string = '';
  efeitoNomeTemp: string = "";
  
  ngOnInit(){
    this.instrumentMade = {
      defaultInstrument: this.instrument,
      effects: [],
      model: ''
    }
  }

  
  
  adicionarParametro(chave: string, valor: string): void {
    if (chave && valor) {
      this.efeito.parameters[chave] = valor
      console.log(this.efeito)
    }
    this.chave = ""
    this.valor = ""
    if(this.editMode){
      this.editMode = false
    }
  }
  
  toggleEdit(chave: string, valor: string){
    this.editMode = !this.editMode
    this.chave = chave
    this.valor = valor
    if(this.editMode){
      delete this.efeito.parameters[chave]
    }
  }

  editParam(){

  }

  changeEffect(effectTo: Effect | null ){
    this.efeito = effectTo || {name: '', parameters: {}}
    if(effectTo){
      this.efeitoNomeTemp = effectTo.name
    }
  }
  naoTemParametros(): boolean {
    return Object.keys(this.efeito.parameters).length === 0;
  }


  saveInstrument(){
  }

  saveEffect(){
    if(this.efeitoNomeTemp.length > 0){
      const index = this.instrumentMade.effects.findIndex(e => e.name === this.efeito.name)
      if(index !== -1){
        this.instrumentMade.effects[index] = this.efeito
        console.log("index encontrado")
      }else{
        this.instrumentMade.effects.push(this.efeito)
        console.log("index não encontrado")

      }
    }else{
      console.log("erro")
    }
    console.log(this.instrumentMade)
    this.efeito.name = this.efeitoNomeTemp
    this.efeitoNomeTemp = ''
    this.efeito = {name: '', parameters: {}}
  }


  // Método chamado ao digitar no input
  nomeEfeito(event: Event): void {
    const inputNome = event.target as HTMLInputElement; // Obtém o elemento do input
    this.nomeEscrito = inputNome.value.trim() !== ''; // Atualiza a variável se o campo não estiver vazio

    this.efeitoNomeTemp = inputNome.value;
    const requiredElement = document.querySelector('.required') as HTMLElement;
    requiredElement.style.display = this.nomeEscrito ? 'none' : 'inline';
  }

  parametroInput(event: Event): void {
    const parametroInput = event.target as HTMLInputElement; // Obtém o elemento do input
    this.parametroEscrito = parametroInput.value.trim() !== ''; // Atualiza a variável se o campo não estiver vazio
  }
}
