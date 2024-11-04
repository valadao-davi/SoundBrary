import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duracao'
})
export class DuracaoPipe implements PipeTransform {
  transform(durationMs: number): string {
    if (!durationMs) return '0:00'; // Tratar casos onde durationMs não é válido

    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
  }
}
