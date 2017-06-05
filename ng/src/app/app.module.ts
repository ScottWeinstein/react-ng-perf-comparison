import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { Tile } from './Tile';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, Tile ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
