import {Component, OnInit} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {NgClass} from "@angular/common";
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragEnd,
  CdkDragStart, CdkDropList,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

interface Item {
  name: string;
  isFlipped: boolean;
}
@Component({
  selector: 'app-abc',
  standalone: true,
  imports: [
    MatCard, NgClass, CdkDrag, CdkDropList
  ],
  templateUrl: './abc.component.html',
  styleUrls: ['./abc.component.scss']
})
export class AbcComponent implements OnInit {
  abc: Item[] = [];
  letters: Item[] = [];
  // abc = ['A', 'Á', 'B', 'C', 'D', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'O', 'Ó', 'Ö', 'Ő', 'P', 'R', 'S', 'T', 'U', 'Ú', 'Ü', 'Ű', 'V', 'Z']


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

  drop(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onDragStart(event: CdkDragStart) {
    event.source.element.nativeElement.classList.add('dragging');
  }

  onDragEnd(event: CdkDragEnd) {
    event.source.element.nativeElement.classList.remove('dragging');
  }
}
