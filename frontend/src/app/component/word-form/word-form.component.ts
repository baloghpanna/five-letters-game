import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {lengthValidator} from "../../validators/length-validator";
import {WordInputModel} from "../../model/wordInput.model";
import {GameService} from "../../service/game.service";
import {GuessResultModel} from "../../model/guessResult.model";
import {WordListComponent} from "../word-list/word-list.component";
import {MatCard} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-word-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton, WordListComponent, MatCard, NgIf],
  templateUrl: './word-form.component.html',
  styleUrl: './word-form.component.scss'
})
export class WordFormComponent implements OnInit, OnDestroy {
  @Output() guessResult!: GuessResultModel[];
  inputWordForm!: FormGroup;
  @Output() guessMade: EventEmitter<void> = new EventEmitter();
  errorMessage: string | null = null;
  private subscription!: Subscription;


  constructor(private formBuilder: FormBuilder,
              protected gameService: GameService
  ) {


  }

  ngOnInit() {
    this.inputWordForm = this.formBuilder.group({
      userWord: ["", lengthValidator(5)]
    });

    this.subscription = this.gameService.gameId$.subscribe(gameId => {
      if (gameId === 0) {
        this.inputWordForm.disable();
      } else {
        this.inputWordForm.enable();
      }
    });

  }

  send() {

    const wordInput: WordInputModel = {
      word: this.inputWordForm.value.userWord
    }

    this.gameService.makeGuessTips(wordInput).subscribe({
      next: () => {
        console.log("****A beküldött szó: " + wordInput.word.toString());
        this.errorMessage = null;
        this.guessMade.emit()
      },
      error: err => {
        this.errorMessage = err.error.message;
      },
      complete: () => {
        this.inputWordForm.reset()
      }
    })
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
