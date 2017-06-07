import {Component, ChangeDetectionStrategy, OnInit, NgZone, ChangeDetectorRef, Input} from '@angular/core';
import { Subscription } from 'rxjs';
import {TicketModel} from './LottoPicker';
import 'rxjs/add/operator/timeInterval';

@Component(
  {
    selector: 'ticket',
    providers: [],
    styles: ['.ticket { float: left; border: 1px solid black; margin: 5px; padding: 2px; font-size: 16px; } '],
    template: `
      <div class="ticket">
        TicketId: {{model.ticketId}}
        <br />
        {{interval}} {{model.pick}}
      </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)
export class Ticket implements OnInit {
  private subscription: Subscription;
  @Input()
  public model: TicketModel;
  public interval: number;

  constructor(private cd: ChangeDetectorRef, private zone: NgZone) {
    cd.detach();
  }

  ngOnInit() {
    // console.log('Tile component created for tileId = ' + this.model.tileId);
    this.zone.runOutsideAngular(() => {
      this.subscription = this.model.updates$.timeInterval().subscribe((x) => {
          this.interval = x.interval;
          this.model.updatePick(x.value);
          this.cd.detectChanges();
        });
    });
  }
}
