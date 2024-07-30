import { Component } from '@angular/core';
import { MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [
    MatDialogModule, MatButtonModule
  ],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.scss'
})
export class RulesComponent {

}
