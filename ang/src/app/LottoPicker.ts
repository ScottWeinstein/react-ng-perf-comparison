import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publish';
import {Injectable} from '@angular/core';

export class PickUpdate {
    ticketId;
    pick;

    constructor(ticketId, pick) {
        this.ticketId = ticketId;
        this.pick = pick;
    }
}

export class TicketModel {
    updates$;
    name = 'A';
    ticketId;
    pick = '95.11';

    constructor(ticketId, name) {
        this.ticketId = ticketId;
        this.name = name;
    }

    updatePick(update) {
        this.pick = update.pick;
    }
}

@Injectable()
export class LottoPicker {
  ticksSubscription;
  lastTicketCount;
  isWorkerEnabled$ = new BehaviorSubject(false);
  addTicketsSubject$ = new Subject();
  resetTicketsSubject$ = new Subject();
  ticketCount$: Observable<number> = this.getTicketCount$(
    this.addTicketsSubject$,
    this.resetTicketsSubject$
  );
  public ticks$: Observable<PickUpdate> = this.getTicks$(this.ticketCount$);

  constructor() {
    this.ticketCount$.subscribe(lastTicketCount => {
      this.lastTicketCount = lastTicketCount;
    });
    this.isWorkerEnabled$.subscribe(() => {
      this.startTicksSubscription();
    });
  }

  getTicketPick$(ticketId: number): Observable<PickUpdate> {
    let svc = this;
    return this.isWorkerEnabled$.switchMap((x) => {
                 return svc.ticks$;
               })
               .filter(pickUpdate => pickUpdate.ticketId === ticketId);
  }

  addTicket(ticketId) {
    this.addTicketsSubject$.next(ticketId);
    // console.log('LottoPicker addTicket to in-memory ticketId = ' + ticketId);
    return this.getTicketPick$(ticketId);
  }

  startTicksSubscription() {
    this.ticksSubscription = this.ticks$.subscribe();
  }

  getTicketCount$(addTicketsSubject$: Subject<any>,
                  resetTicketsSubject$: Subject<any>): Observable<number> {
    return Observable.merge(
      // increment
      addTicketsSubject$.asObservable()
                        .map(function (x) {
                          return { num: x, reset: false };
                        }),

      // reset
      resetTicketsSubject$.asObservable()
                          .map(function () {
                            return { num: 0, reset: true };
                          })
                     )
                     .scan((acc, value) => {
                       return value.reset ? 0 : value.num;
                     }, 0);
  }

  getTicks$(ticketCount$: Observable<number>): Observable<PickUpdate> {
    return ticketCount$
      .switchMap((ticketCount, i) => {
        return Observable.interval(50).mergeMap(() => {
          return Observable.range(1, ticketCount);
        });
      })
      .map((ticketId) => new PickUpdate(ticketId, (Math.random() * 100).toFixed(2)))
      .publish().refCount();
  }
}
