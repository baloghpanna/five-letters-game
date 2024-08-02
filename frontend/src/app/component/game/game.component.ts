import {Component, Input} from '@angular/core';
import {AbcComponent} from "../abc/abc.component";
import {SecretWordComponent} from "../secret-word/secret-word.component";
import {WordFormComponent} from "../word-form/word-form.component";
import {WordListComponent} from "../word-list/word-list.component";
import {WordSecretModel} from "../../model/wordSecret.model";
import {MatDialog} from "@angular/material/dialog";
import {RulesComponent} from "../rules/rules.component";
import {MatButton} from "@angular/material/button";
import {AbcLettersComponent} from "../abc-letters/abc-letters.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    AbcComponent,
    SecretWordComponent,
    WordFormComponent,
    WordListComponent,
    MatButton,
    AbcLettersComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  @Input() secretWord!: WordSecretModel;
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(RulesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
