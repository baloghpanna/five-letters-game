import {WordInputModel} from "./wordInput.model";
import {WordSecretModel} from "./wordSecret.model";

export interface GameInput {
  inputWord: WordInputModel;
  secretWord: WordSecretModel;

  // constructor(inputWord: WordInputModel, secretWord: WordSecretModel) {
  //   this.inputWord = inputWord;
  //   this.secretWord = secretWord;
  // }

}
