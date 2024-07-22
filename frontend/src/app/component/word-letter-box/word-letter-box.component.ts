import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-word-letter-box',
  standalone: true,
  imports: [
    NgStyle,
    NgForOf
  ],
  templateUrl: './word-letter-box.component.html',
  styleUrl: './word-letter-box.component.scss'
})
export class WordLetterBoxComponent {
  @Input() word: string = '';
  @Input() colors: string[] = [];
  @Output() colorChange = new EventEmitter<string[]>();


  get boxes() {
    return this.word.split('');
  }

  changeColor(index: number) {
    if (!this.colors[index]) {
      this.colors[index] = 'red';
    } else if (this.colors[index] === 'red') {
      this.colors[index] = 'green';
    } else {
      this.colors[index] = '';
    }

    this.colorChange.emit(this.colors);
  }

  // changeColor(index: number, type: string) {
  //   if (type === 'single') {
  //     this.colors[index] = 'red';
  //   } else if (type === 'double') {
  //     this.colors[index] = 'green';
  //   }
  // }

  // handleDoubleClick(event: MouseEvent, index: number) {
  //   event.preventDefault();
  //   this.changeColor(index, 'double');
  // }



}
