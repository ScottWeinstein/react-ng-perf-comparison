import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { LottoPicker } from './LottoPicker';
import { GroupView } from './GroupView';
import { Ticket } from './Ticket';

@NgModule({
  providers: [LottoPicker],
  imports: [BrowserModule],
  declarations: [AppComponent, GroupView, Ticket],
  bootstrap: [AppComponent]
})
export class AppModule {
}
