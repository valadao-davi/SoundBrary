import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
    const slider = document.getElementById('slider');

    if (slider) {
      slider.addEventListener('wheel', (e: WheelEvent) => {
        e.preventDefault(); // Impede o scroll vertical padrão
        slider.scrollLeft += e.deltaY; // Rola horizontalmente
      });

      // Para permitir arrastar com o mouse
      let isDown = false;
      let startX: number;
      let scrollLeft: number;

      slider.addEventListener('mousedown', (e: MouseEvent) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });

      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
      });

      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
      });

      slider.addEventListener('mousemove', (e: MouseEvent) => {
        if (!isDown) return; // Apenas executa se estiver pressionando o mouse
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; // Velocidade de deslizamento
        slider.scrollLeft = scrollLeft - walk;
      });
    }
  }
}
