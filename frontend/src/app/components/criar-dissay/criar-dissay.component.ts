import { Component } from '@angular/core';
import { DefaultInstrument } from 'src/app/layouts/DefaultInstrument';
import { ServiceInstrumentsImageService } from 'src/app/services/service-instruments-image.service';

@Component({
  selector: 'app-criar-dissay',
  templateUrl: './criar-dissay.component.html',
  styleUrls: ['./criar-dissay.component.css']
})
export class CriarDissayComponent {

  listDefaultInstruments: DefaultInstrument[] = [];
  maxLengthTitle: number = 100        // Limite para o título
  maxLengthDescription: number = 1000; // Limite para a descrição
  charCountTitle: number = 0;          // Contador para o título
  charCountDescription: number = 0;    // Contador para a descrição

  titleValue: string = '';
  descriptionValue: string = '';

  constructor(private serviceDefaultImages: ServiceInstrumentsImageService) {}

  ngOnInit() {
    this.listDefaultInstruments = this.serviceDefaultImages.getDefaultInstruments();
  }

  // Ajusta dinamicamente a altura do textarea conforme o conteúdo
  adjustHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';  // Reseta a altura para o valor 'auto' antes de recalcular
    textarea.style.height = `${textarea.scrollHeight}px`;  // Ajusta a altura conforme o conteúdo
  }

  // Função para atualizar os contadores e verificar o limite
  onInput(event: Event, type: string): void {
    console.log (this.charCountDescription)
    console.log (this.maxLengthDescription)
    
    const target = event.target as HTMLTextAreaElement | HTMLInputElement;
    if (target) {
      if (type === 'title') {
        this.charCountTitle = target.value.length;
        this.titleValue = target.value;
      } else if (type === 'description') {
        this.charCountDescription = target.value.length;
        this.descriptionValue = target.value;
      }
    }
  }
}
