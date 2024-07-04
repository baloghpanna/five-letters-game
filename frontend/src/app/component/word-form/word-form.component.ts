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
              private gameService: GameService) {
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
    this.gameService.makeGuessTips(this.inputWordForm.value, this.wordSecretModel);
    console.log(this.inputWordForm.value);
    this.inputWordForm.reset();
  }
}
