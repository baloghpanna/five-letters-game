import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {NgClass} from "@angular/common";

interface Item {
  name: string;
  isFlipped: boolean;
}
@Component({
  selector: 'app-abc',
  standalone: true,
  imports: [
    MatCard, NgClass
  ],
  templateUrl: './abc.component.html',
  styleUrl: './abc.component.scss'
})
export class AbcComponent implements OnInit {
  abc: Item[] = [];
  // abc = ['A', 'Á', 'B', 'C', 'D', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'O', 'Ó', 'Ö', 'Ő', 'P', 'R', 'S', 'T', 'U', 'Ú', 'Ü', 'Ű', 'V', 'Z']


  constructor() {
  }
  ngOnInit() {
    this.abc = this.createItemsArray();
  }

  setThis(item: Item, target: boolean) {
    item.isFlipped = target;
  }

  createItemsArray(): Item[] {
    const alphabet = 'AÁBCDEÉFGHIÍJKLMNOÓÖŐPRSTUÚÜŰVZ';
    const itemsArray: Item[] = [];
    for (const char of alphabet) {
      itemsArray.push({ name: char, isFlipped: false });
    }
    return itemsArray;
  }

}
