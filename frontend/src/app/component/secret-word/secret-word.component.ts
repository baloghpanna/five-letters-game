import {Component} from '@angular/core';
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
  secretWord!: string;
  isGetSecretWord = false;

  constructor(private gameService: GameService) {
  }


  getSecretWord() {
    this.gameService.getSecretWords().subscribe({
      next: value => {
        this.secretWord = value.secretWord;
        console.log("A kitalálandó szó: "+this.secretWord)
        this.isGetSecretWord = true;
      },
      error: err => console.log(err)
    })
  }
}

