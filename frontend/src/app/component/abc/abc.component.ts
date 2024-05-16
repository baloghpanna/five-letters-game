import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-abc',
  standalone: true,
  imports: [
    MatCard
  ],
  templateUrl: './abc.component.html',
  styleUrl: './abc.component.scss'
})
export class AbcComponent implements AfterViewInit {
    abc = ['A', 'Á', 'B', 'C', 'D', 'E', 'É', 'F','G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'O', 'Ó', 'Ö', 'Ő', 'P', 'R', 'S', 'T', 'U', 'Ú', 'Ü', 'Ű', 'V', 'Z']
    minBoxesPerRow: number = 0;

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit() {
    this.calculateMinBoxesPerRow();
    // Esetlegesen figyelj változásokra, amelyek újraszámolást igényelhetnek
    // pl.: ablakméret változása
    window.addEventListener('resize', () => {
      this.calculateMinBoxesPerRow();
    });
  }

  calculateMinBoxesPerRow() {
    const containerWidth = this.elRef.nativeElement.querySelector('.abc-container').offsetWidth;
    const boxWidth = this.elRef.nativeElement.querySelector('.letters-box').offsetWidth;
    // Számold ki, hány betű-négyzet fér el egy sorban
    this.minBoxesPerRow = Math.floor(containerWidth / boxWidth);
  }
}
