import {Component, EventEmitter, Input} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {GuessResultModel} from "../../model/guessResult.model";
import {GameService} from "../../service/game.service";
import {WordLetterBoxComponent} from "../word-letter-box/word-letter-box.component";

@Component({
  selector: 'app-word-list',
  standalone: true,
  imports: [
    MatCard,
    WordLetterBoxComponent
  ],
  templateUrl: './word-list.component.html',
  styleUrl: './word-list.component.scss'
})
export class WordListComponent {

  guessedWords!: GuessResultModel[];
  @Input() refreshList: EventEmitter<void> = new EventEmitter<void>();



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


