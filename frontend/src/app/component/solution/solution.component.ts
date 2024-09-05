import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GameService} from "../../service/game.service";
import {lengthValidator} from "../../validators/length-validator";
import {MatButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {SolutionInputModel} from "../../model/solutionInput.model";
import {normalizeExtraEntryPoints} from "@angular-devkit/build-angular/src/tools/webpack/utils/helpers";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MessageSolutionComponent} from "../message-solution/message-solution.component";
// import {MessageSolutionComponent} from "../message-solution/message-solution.component";

@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.scss'
})
export class SolutionComponent {
  inputSolutionWord: FormGroup;

  constructor(formBuilder: FormBuilder,
              private gameService: GameService,
              public dialog: MatDialog,
  ) {
    this.inputSolutionWord = formBuilder.group({
      solutionWord: ["", lengthValidator(5)]
    })

  }

  sendSolution(){
    this.gameService.checkSolution({solutionWord: this.inputSolutionWord.value.solutionWord, isCorrect: false}).subscribe({
     next: isCorrect => {
       if (isCorrect) {
         this.gameService.setGameId(0);
         console.log('Megoldás helyes:', isCorrect);
         this.openDialog(isCorrect);
       } else {
          console.log('Megoldás helytelen:', isCorrect);
          this.openDialog(isCorrect);
       }
     }

    });
  }

  private openDialog(isSuccess: boolean) {
  this.dialog.open(MessageSolutionComponent,
    {
      data: { isSuccess: isSuccess }
    });
  }
}
