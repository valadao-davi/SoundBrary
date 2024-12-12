import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numeroFormatado'
})
export class NumeroFormatadoPipe implements PipeTransform {

  transform(value: number | string): string {
    if (value == null || value === '') {
      return '';
    }

    // Verifica se o valor é uma string, se não for converte para string
    let valorString = value.toString();

    // Adiciona ponto a cada 3 dígitos
    return valorString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

}
