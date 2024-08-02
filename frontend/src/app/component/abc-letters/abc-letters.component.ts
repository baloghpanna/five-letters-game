import { Component } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray,
  transferArrayItem} from '@angular/cdk/drag-drop';
import {MatCard} from "@angular/material/card";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-abc-letters',
  templateUrl: './abc-letters.component.html',
  standalone: true,
  imports: [
    CdkDrag, CdkDropList,
    NgForOf
  ],
  styleUrls: ['./abc-letters.component.scss']
})
export class AbcLettersComponent {
  letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  flipped = Array(this.letters.length).fill(false);
  neededLetters: string[] = [];

  flipCard(index: number) {
    this.flipped[index] = !this.flipped[index];
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
