import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'tile',
    template: `
        <div class='tile'>
          {{cross[0].name}}
          {{this.cross[0].price}}

          {{cross[1].name}}
          {{this.cross[1].price}}

          {{cross[2].name}}
          {{this.cross[2].price}}

          {{cross[3].name}}
          {{this.cross[3].price}}

          {{cross[4].name}}
          {{this.cross[4].price}}

          {{cross[5].name}}
          {{this.cross[5].price}}
        </div>
    `,
})
export class Tile implements OnInit {
  constructor(
  ) { }
  cross: any[];
  newTick() {
    return [
          { name: 'A', price: Math.random() },
          { name: 'B', price: Math.random() },
          { name: 'C', price: Math.random() },
          { name: 'D', price: Math.random() },
          { name: 'E', price: Math.random() },
          { name: 'F', price: Math.random() },
        ]
  }

   ngOnInit() {
     this.cross = this.newTick()
     setInterval(() => this.cross = this.newTick(), 10);
    }
}
