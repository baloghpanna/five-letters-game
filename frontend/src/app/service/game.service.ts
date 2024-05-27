import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WordSecretModel} from "../model/wordSecret.model";
import {Observable} from "rxjs";

const BASE_URL= 'http://localhost:8080/api/words'
@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getSecretWords(): Observable<WordSecretModel>{
    return this.http.get<WordSecretModel>(BASE_URL);
  }
}
