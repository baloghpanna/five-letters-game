import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WordSecretModel} from "../model/wordSecret.model";
import {BehaviorSubject, Observable} from "rxjs";
import {WordListModel} from "../model/wordList.model";
import {WordInputModel} from "../model/wordInput.model";

const BASE_URL = 'http://localhost:8081/api/words'

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {
  }

  getSecretWord(): Observable<WordSecretModel> {
    return this.http.get<WordSecretModel>(BASE_URL);
  }

  makeGuessTips(inputWord: WordInputModel, secretWordId: number): Observable<any> {
    const url = `${BASE_URL}?secretWordId=${secretWordId}`;
    return this.http.post(url, inputWord);
  }

  private wordSecretObject   = new BehaviorSubject<WordSecretModel>({ secretWord: '', id: 0});
  wordSecretModel$ = this.wordSecretObject .asObservable();

  updateSecretWord(data: WordSecretModel) {
    this.wordSecretObject.next(data);
  }
}
