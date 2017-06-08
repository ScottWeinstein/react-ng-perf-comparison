import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LottoPicker } from './LottoPicker';
import { GroupView } from './GroupView';
import { Ticket } from './Ticket';

@NgModule({
  providers: [LottoPicker],
  declarations: [AppComponent, GroupView, Ticket],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
