import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GameService} from "../../service/game.service";
import {lengthValidator} from "../../validators/length-validator";
import {MatButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {SolutionInputModel} from "../../model/solutionInput.model";
import {Subscription} from "rxjs";

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
    ReactiveFormsModule
  ],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.scss'
})
export class SolutionComponent implements OnInit, OnDestroy {
  inputSolutionWord!: FormGroup;
  private subscription!: Subscription;

  constructor(private formBuilder: FormBuilder,
              protected gameService: GameService
  ) {


  }

  ngOnInit() {
    this.inputSolutionWord = this.formBuilder.group({
      solutionWord: ["", lengthValidator(5)]
    })

    this.subscription = this.gameService.gameId$.subscribe(gameId => {
      if (gameId === 0) {
        this.inputSolutionWord.disable();
      } else {
        this.inputSolutionWord.enable();
      }
    });

  }

  sendSolution(){
    this.gameService.checkSolution({solutionWord: this.inputSolutionWord.value.solutionWord, isCorrect: false}).subscribe(isCorrect =>{
      console.log('Megoldás helyes:', isCorrect);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
