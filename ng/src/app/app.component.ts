import { Component } from '@angular/core';
import { Tile } from './Tile';
import * as rx from 'rxjs/Rx';

@Component({
  selector: 'my-app',
  template: `
   <input #tileCount type="number"
      (keyup.enter)="setCount(tileCount.value)"
      (blur)="setCount(tileCount.value); value='20' ">
    <div class='tiles'>
        <tile  *ngFor="let tile of tiles"></tile>
    </div>
    `,
})
export class AppComponent  {
  name = 'Angular';
  tiles: number[] = [];
  tileCount: number = 20;

  setCount(cnt: number) {
    rx.Observable.range(0, cnt).toArray().subscribe((res) => this.tiles=res);
  }
}
