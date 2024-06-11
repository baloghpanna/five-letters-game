import {Component, Input} from '@angular/core';
import {WordSecretModel} from "./model/wordSecret.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Five Letters Game';


  // updateSecretWord(newWord: WordSecretModel) {
  //   this.secretWord = newWord;
  // }

}
