import {Component, Input} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {GuessResultModel} from "../../model/guessResult.model";
@Component({
  selector: 'app-word-list',
  standalone: true,
  imports: [
    MatCard
  ],
  templateUrl: './word-list.component.html',
  styleUrl: './word-list.component.scss'
})
export class WordListComponent {
  // @Input() guessedWords!: GuessResultModel[];
 guessedWords: GuessResultModel[] | undefined;
  // outplayedWords: WordListModel[] = [];
  // outplayedWords: any[] = ['sátor', 'sisak', 'fárad', 'zabla'];

  constructor() {
    // console.log("a modell hossza-list: " + this.guessedWords.length);

  }



}


