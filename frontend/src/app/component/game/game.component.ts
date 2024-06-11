import {Component, Input} from '@angular/core';
import {AbcComponent} from "../abc/abc.component";
import {SecretWordComponent} from "../secret-word/secret-word.component";
import {WordFormComponent} from "../word-form/word-form.component";
import {WordListComponent} from "../word-list/word-list.component";
import {WordSecretModel} from "../../model/wordSecret.model";

@Component({
  selector: 'app-game',
  standalone: true,
    imports: [
        AbcComponent,
        SecretWordComponent,
        WordFormComponent,
        WordListComponent
    ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  @Input() secretWord!: WordSecretModel;
}
