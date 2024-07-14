import {Component, Input, OnInit, Output} from '@angular/core';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {lengthValidator} from "../../validators/length-validator";
import {WordInputModel} from "../../model/wordInput.model";
import {WordSecretModel} from "../../model/wordSecret.model";
import {GameService} from "../../service/game.service";
import {GuessResultModel} from "../../model/guessResult.model";
import {WordListComponent} from "../word-list/word-list.component";
import {MatCard} from "@angular/material/card";
import {GameInput} from "../../model/gameInput.model";



@Component({
  selector: 'app-word-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton, WordListComponent, MatCard],
  templateUrl: './word-form.component.html',
  styleUrl: './word-form.component.scss'
})
export class WordFormComponent implements OnInit{
  @Input() wordSecretModel!: WordSecretModel;
  @Output() guessResult!: GuessResultModel[];
  inputWordForm: FormGroup;



  constructor(formBuilder: FormBuilder,
              private gameService: GameService
  ) {
    this.inputWordForm = formBuilder.group({
      userWord: ["", lengthValidator(5)]
    })

  }
  ngOnInit() {
    this.gameService.wordSecretModel$.subscribe(data => {
      this.wordSecretModel = data;
    });
  }

  send(){
    const gameInput: GameInput = {
      wordInput: { word: this.inputWordForm.value.userWord },
      wordSecret: this.wordSecretModel
    };
    console.log("A beküldött szó: " + gameInput.wordInput.word);

    this.gameService.makeGuessTips(gameInput.wordInput, gameInput.wordSecret).subscribe({
      next: () => {console.log("****A beküldött szó: " + gameInput.wordInput.word);},
      error: err => console.log(err),
      complete: () =>  this.inputWordForm.reset()
    })
  }

  // makeGuess() {
  //   const gameInput: GameInput = {
  //     inputWord: this.inputWordForm.value,
  //     secretWord: this.wordSecretModel
  //   }
  //   this.gameService.makeGuessTips(gameInput).subscribe( response => {
  //       console.log('Guess saved successfully', response);
  //     },
  //     error => {
  //       console.error('Error saving guess', error);
  //     }
  //   );

  // }
}
