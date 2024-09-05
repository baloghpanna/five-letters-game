import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-message-solution',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent
  ],
  templateUrl: './message-solution.component.html',
  styleUrl: './message-solution.component.scss'
})
export class MessageSolutionComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { isSuccess: boolean }) {}

}
