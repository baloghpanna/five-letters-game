import {Component, Input} from '@angular/core';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {lengthValidator} from "../../validators/length-validator";
import {WordInputModel} from "../../model/wordInput.model";
import {WordSecretModel} from "../../model/wordSecret.model";
import {GameService} from "../../service/game.service";

@Component({
  selector: 'app-word-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton],
  templateUrl: './word-form.component.html',
  styleUrl: './word-form.component.scss'
})
export class WordFormComponent {
  @Input() secretWord!: WordSecretModel;
  inputWord!: WordInputModel;
  // inputWord: string | null | undefined;

  inputWordForm: FormGroup;

  // inputFormControl = new FormControl('', [lengthValidator(5)]);

  constructor(formBuilder: FormBuilder,
              private gameService: GameService) {
    this.inputWordForm = formBuilder.group({
      userWord: ["", lengthValidator(5)]
    })
  }

  send(){
    this.gameService.makeGuessTips(this.inputWordForm.value, this.secretWord.id).subscribe()

    // this.inputWord = this.inputWordForm.value;
    // console.log("A tippelt szó: " + JSON.stringify(this.inputWordForm.value));
    // this.inputWordForm.reset();
    // console.log("A tippelt szó: " + this.inputWord);
  }
}
