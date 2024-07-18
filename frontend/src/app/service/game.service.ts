import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WordSecretModel} from "../model/wordSecret.model";
import {BehaviorSubject, Observable} from "rxjs";
import {WordInputModel} from "../model/wordInput.model";
import {GuessResultModel} from "../model/guessResult.model";

const BASE_URL = 'http://localhost:8081/api/words'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameId: number = 0;

  constructor(private http: HttpClient) {
  }

  setGameId(id: number): void {
    this.gameId = id;
  }

  getGameId(): number {
    return this.gameId;
  }

  getSecretWord(): Observable<WordSecretModel> {
    return this.http.get<WordSecretModel>(BASE_URL);
  }

  makeGuessTips(inputWord: WordInputModel) {
    console.log("A beküldött szó: " + inputWord.word + " ---gameID: " + this.gameId);
    return this.http.post(`${BASE_URL}/${this.gameId}/guess`, inputWord);
  }

  private wordSecretObject = new BehaviorSubject<WordSecretModel>({secretWord: '', wordId: 0, gameId: 0});
  wordSecretModel$ = this.wordSecretObject.asObservable();

  updateSecretWord(data: WordSecretModel) {
    this.wordSecretObject.next(data);
  }

  getGuessList() : Observable<GuessResultModel[]> {
    return this.http.get<GuessResultModel[]>(`${BASE_URL}/${this.gameId}`);
  }
}
