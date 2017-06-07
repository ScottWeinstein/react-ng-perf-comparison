import { TicketModel, LottoPicker } from './LottoPicker';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  NgZone,
  OnInit,
  AfterViewInit
} from '@angular/core';


@Component({
  selector: 'group-view',
  template: `
      <div class="container">
          <ticket *ngFor="let ticket of selectedItems;trackBy:ticketIdTrackFn"
                     [model]="ticket"></ticket>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupView implements OnInit, AfterViewInit {
  @Input()
  initialQuantity: number = 0;
  initTime: number = 0;
  selectedItems: Array<TicketModel> = [];
  private ticketId: number = 0;

  constructor(private zone: NgZone, private picker: LottoPicker) {}

  ngOnInit(): void {
    console.log('GroupView initial quantity = ' + this.initialQuantity);
    this.initTime = window.performance.now();
    this.addPairs(this.initialQuantity);
  }

  ngAfterViewInit(): void {
    let loadTime = (window.performance.now() - this.initTime);
    console.log('load time = ' + loadTime + ' ms');
  }

  getNextTicketId() {
    return ++this.ticketId;
  }

  addPairs(numberToAdd) {
    if (numberToAdd < 1) {
      return;
    }
    for (let i = 0; i < numberToAdd; i++) {
      let t = this.getNewTicket('A');
      t.updates$ = this.picker.addTicket(t.ticketId);
      this.selectedItems.push(t);
    }
  }

  // addPairs(numberToAdd) {
  //   if (numberToAdd < 1) {
  //     return;
  //   }
  //   let maxTileId = 0;
  //   for (let i = 0; i < numberToAdd; i++) {
  //     let t: TileModel = this.getNewTile(this.currencyPairs[0]);
  //     this.state.selectedPairs.push(t);
  //     if (i === numberToAdd - 1) {
  //       maxTileId = t.tileId;
  //     }
  //   }
  //   this.appState.set('selectedPairs', this.state.selectedPairs);
  //   this.zone.runOutsideAngular(() => {
  //     setTimeout(() => (this.priceService.addTile(maxTileId)), 0);
  //   });
  // }
  // addPair(selectedPair) {
  //   let t: TileModel = this.getNewTile(selectedPair);
  //   this.state.selectedPairs.push(t);
  //   this.zone.runOutsideAngular(() => {
  //     this.priceService.addTile(t.tileId);
  //   });
  //   this.appState.set('selectedPairs', this.state.selectedPairs);
  // }

  ticketIdTrackFn(index: number, ticketModel: TicketModel): number {
    return ticketModel || ticketModel.ticketId;
  }

  getNewTicket(selectedGame) {
    return new TicketModel(this.getNextTicketId(), selectedGame);
  }

}


