import { Component, effect, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DefaultInstrument } from 'src/app/layouts/DefaultInstrument';

@Component({
  selector: 'app-instrumento-criar-overlay',
  templateUrl: './instrumento-criar-overlay.component.html',
  styleUrls: ['./instrumento-criar-overlay.component.css']
})
export class InstrumentoCriarOverlayComponent {
  @Input() instrument!: DefaultInstrument;
  instrumentoForm!: FormGroup;
  nomeEscrito: boolean = false; // Inicializa a variável como falsa
  parametroEscrito: boolean = false; // Inicializa a variável como falsa
  valorEscrito: boolean = false; // Inicializa a variável como falsa

  chave: string = '';
  valor: string = '';

  effect = {
    nome: "",
    parametros: [] as { chave: string; valor: string }[]
  }
  
  adicionarParametro(chave: string, valor: string): void {
    if (chave && valor) {
      this.effect.parametros.push({ chave, valor });
      this.chave = ""
      this.valor = ""
    }
    
  }



  saveInstrument(){
    
  }

  saveEffect(){

  }


  // Método chamado ao digitar no input
  nomeEfeito(event: Event): void {
    const inputNome = event.target as HTMLInputElement; // Obtém o elemento do input
    this.nomeEscrito = inputNome.value.trim() !== ''; // Atualiza a variável se o campo não estiver vazio

    // Se `nomeEscrito` for true, oculta o asterisco
    this.effect.nome = inputNome.value;
    const requiredElement = document.querySelector('.required') as HTMLElement;
    requiredElement.style.display = this.nomeEscrito ? 'none' : 'inline';
  }

  parametroInput(event: Event): void {
    const parametroInput = event.target as HTMLInputElement; // Obtém o elemento do input
    this.parametroEscrito = parametroInput.value.trim() !== ''; // Atualiza a variável se o campo não estiver vazio

    // Se `nomeEscrito` for true, oculta o asterisco
    this.effect.nome = parametroInput.value;
    const requiredElement = document.querySelector('.input_parametro') as HTMLElement;
    requiredElement.style.border = this.parametroEscrito ? 'solid 0px transparent' : 'solid 1px black';
  }
}
