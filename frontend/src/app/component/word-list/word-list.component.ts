import {Component, EventEmitter, Input} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {GuessResultModel} from "../../model/guessResult.model";
import {GameService} from "../../service/game.service";

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
  @Input() refreshList: EventEmitter<void> = new EventEmitter<void>();
  // outplayedWords: WordListModel[] = [];
  // outplayedWords: any[] = ['sátor', 'sisak', 'fárad', 'zabla'];

  constructor(private gameService: GameService) {
    // @ts-ignore
    this.refreshList.subscribe(() => {
      this.getGuessList();
    })
  }

  getGuessList() {
    this.gameService.getGuessList().subscribe(data => {
      this.guessedWords = data;
      console.log("a modell hossza-list: " + this.guessedWords.length);
    })

  }

}


