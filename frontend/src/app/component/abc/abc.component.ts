import { Component } from '@angular/core';
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
export class AbcComponent {
    abc = ['A', 'Á', 'B', 'C', 'D', 'E', 'É', 'F','G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'O', 'Ó', 'Ö', 'Ő', 'P', 'R', 'S', 'T', 'U', 'Ú', 'Ü', 'Ű', 'V', 'Z']
}
