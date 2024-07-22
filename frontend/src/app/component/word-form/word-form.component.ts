import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {lengthValidator} from "../../validators/length-validator";
import {WordInputModel} from "../../model/wordInput.model";
import {WordSecretModel} from "../../model/wordSecret.model";
import {GameService} from "../../service/game.service";
import {GuessResultModel} from "../../model/guessResult.model";
import {WordListComponent} from "../word-list/word-list.component";
import {MatCard} from "@angular/material/card";


@Component({
  selector: 'app-word-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton, WordListComponent, MatCard],
  templateUrl: './word-form.component.html',
  styleUrl: './word-form.component.scss'
})
export class WordFormComponent implements OnInit {
  @Input() wordSecretModel!: WordSecretModel;
  @Output() guessResult!: GuessResultModel[];
  inputWordForm: FormGroup;
  @Output() guessMade: EventEmitter<void> = new EventEmitter();


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

  send() {

    const wordInput: WordInputModel = {
      word: this.inputWordForm.value.userWord
    }

    this.gameService.makeGuessTips(wordInput).subscribe({
      next: () => {
        console.log("****A beküldött szó: " + wordInput.word.toString());
        this.guessMade.emit()
      },
      error: err => console.log(err),
      complete: () => {
        this.inputWordForm.reset()
      }
    })
  }


}
