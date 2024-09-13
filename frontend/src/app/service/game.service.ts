import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {WordSecretModel} from "../model/wordSecret.model";
import {BehaviorSubject, Observable} from "rxjs";
import {WordInputModel} from "../model/wordInput.model";
import {GuessResultModel} from "../model/guessResult.model";
import {SolutionInputModel} from "../model/solutionInput.model";

const BASE_URL = 'http://localhost:8081/api/words'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameIdSubject = new BehaviorSubject<number>(0);
  gameId$= this.gameIdSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  setGameId(id: number): void {
    this.gameIdSubject.next(id);
  }

  getGameId(): number {
    return this.gameIdSubject.getValue();
  }

  getSecretWord(): Observable<WordSecretModel> {
    return this.http.get<WordSecretModel>(BASE_URL);
  }

  makeGuessTips(inputWord: WordInputModel): Observable<boolean> {
    console.log("A beküldött szó: " + inputWord.word + " ---gameID: " + this.getGameId());
    return this.http.post<boolean>(`${BASE_URL}/${this.getGameId()}/guess`, inputWord);
  }

  private wordSecretObject = new BehaviorSubject<WordSecretModel>({secretWord: '', wordId: 0, gameId: 0});
  wordSecretModel$ = this.wordSecretObject.asObservable();

  updateSecretWord(data: WordSecretModel) {
    this.wordSecretObject.next(data);
  }

  getGuessList() : Observable<GuessResultModel[]> {
    return this.http.get<GuessResultModel[]>(`${BASE_URL}/${this.getGameId()}`);
  }

  checkSolution(solution: SolutionInputModel): Observable<boolean> {
    const params = new HttpParams()
      .set('solutionWord', solution.solutionWord);
    return this.http.get<boolean>(`${BASE_URL}/${this.getGameId()}/solution`, {params});
  }

  // checkSolution(solution: SolutionInputModel):
  // checkSolution(solutionWord: String): Observable<boolean> {
  //   const params = new HttpParams()
  //     .set('solutionWord', solutionWord);
  //   return this.http.get<boolean>(`${BASE_URL}/${this.gameId}/solution`, {params});
  // }

}
