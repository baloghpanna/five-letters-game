import { Component } from '@angular/core';
import {WordListModel} from "../../model/wordList.model";
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-word-list',
  standalone: true,
  imports: [
    MatCard
  ],
  templateUrl: './word-list.component.html',
  styleUrl: './word-list.component.scss'
})
export class WordListComponent {
  // outplayedWords: WordListModel[] = [];
  outplayedWords: any[] = ['sátor', 'sisak', 'fárad', 'zabla'];

}
