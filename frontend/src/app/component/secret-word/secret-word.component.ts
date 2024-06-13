import {Component, EventEmitter, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {GameService} from "../../service/game.service";
import {WordSecretModel} from "../../model/wordSecret.model";
import {AsyncPipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-secret-word',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    AsyncPipe,
    MatIcon
  ],
  templateUrl: './secret-word.component.html',
  styleUrl: './secret-word.component.scss'
})
export class SecretWordComponent {
  secretWord!: WordSecretModel;
  // @Output() secretWord: EventEmitter<WordSecretModel> = new EventEmitter<WordSecretModel>();
  isGetSecretWord = false;

  constructor(private gameService: GameService) {
  }


  getSecretWord() {
    this.gameService.getSecretWord().subscribe({
      next: value => {
        this.secretWord = value;
        console.log("A kitalálandó szó: " + this.secretWord.secretWord)
        this.isGetSecretWord = true;
        this.gameService.updateSecretWord({ id: this.secretWord.id, secretWord: this.secretWord.secretWord });
      },
      error: err => console.log(err)
    })
  }
}

