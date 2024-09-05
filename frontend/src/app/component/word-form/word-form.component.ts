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
import {NgIf} from "@angular/common";
import {MessageNoWordComponent} from "../message-no-word/message-no-word.component";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-word-form',
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    WordListComponent,
    MatCard,
    NgIf,
    MatDialogModule],
  templateUrl: './word-form.component.html',
  styleUrl: './word-form.component.scss'
})
export class WordFormComponent implements OnInit {
  @Input() wordSecretModel!: WordSecretModel;
  @Output() guessResult!: GuessResultModel[];
  inputWordForm: FormGroup;
  @Output() guessMade: EventEmitter<void> = new EventEmitter();
  errorMessage: string | null = null;


  constructor(formBuilder: FormBuilder,
              public dialog: MatDialog,
              protected gameService: GameService
  ) {
    this.inputWordForm = formBuilder.group({
      userWord: [{value: ''}, [lengthValidator(5) ]]
    });

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
      next: (result) => {
        if (result) {
          console.log("****A beküldött szó: " + wordInput.word.toString());
          this.errorMessage = null;
          this.guessMade.emit()
        } else {
          this.openDialog();
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
      },
      complete: () => {
        this.inputWordForm.reset()
      }
    })
  }

  openDialog(): void {
    this.dialog.open(MessageNoWordComponent);
  }

}
