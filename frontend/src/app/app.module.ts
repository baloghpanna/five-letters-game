import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AbcComponent} from "./component/abc/abc.component";
import {WordFormComponent} from "./component/word-form/word-form.component";
import {WordListComponent} from "./component/word-list/word-list.component";
import {SecretWordComponent} from "./component/secret-word/secret-word.component";
import {HttpClientModule} from '@angular/common/http';
import {GameComponent} from "./component/game/game.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AbcComponent,
    WordFormComponent,
    WordListComponent,
    SecretWordComponent,
    GameComponent
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
