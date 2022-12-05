import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GameComponent } from './game.component';
import { BoardComponent } from './board/board.component';
import { FieldComponent } from './field/field.component';

@NgModule({
  declarations: [
    GameComponent,
    BoardComponent,
    FieldComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [GameComponent]
})
export class AppModule { }
