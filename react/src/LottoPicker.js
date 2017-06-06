import { Observable, Subject, BehaviorSubject } from "rxjs";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/merge";
import "rxjs/add/observable/interval";
import "rxjs/add/observable/range";
import "rxjs/add/operator/map";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/share";
import "rxjs/add/operator/publish";

export class LottoPicker {

  ticksSubscription;
  workerPicks$;
  lastTicketCount;
  isWorkerEnabled$ = new BehaviorSubject(this.workerInitialized);
  addTicketsSubject$ = new Subject();
  resetTicketsSubject$ = new Subject();
  ticketCount$ = this.getTicketCount$(
    this.addTicketsSubject$,
    this.resetTicketsSubject$,
    'LottoPicker'
  );
  ticks$ = this.getTicks$(this.ticketCount$, 'LottoPicker');

  constructor() {
    // this.initWorker();
    this.ticketCount$.subscribe(lastTicketCount => {
      this.lastTicketCount = lastTicketCount;
    });

    this.isWorkerEnabled$.subscribe((x) => {
      // console.debug('LottoPicker isWorkerEnabled$ = ' + x +
      //             ' lastTicketCount = ' + this.lastTicketCount);
      if (x) {
        this.stopTicksSubscription();
        this.startWorker(this.lastTicketCount);
      } else {
        this.startTicksSubscription();
        this.stopWorker();
      }
    });
  }

  getTicketPick$(ticketId) {
    // console.log('LottoPicker getTicketPick$ ticketId = ' + ticketId);

    let svc = this;
    return this.isWorkerEnabled$.switchMap((x) => {
                 if (x) {
                   // console.debug('LottoPicker getTicketPick$ switching to worker');
                   return svc.workerPicks$.map(msg => msg.data);
                 } else {
                   // console.debug('LottoPicker getTicketPick$ switching to non-worker');
                   return svc.ticks$;
                 }
               })
               .filter(ticketUpdate => ticketUpdate.ticketId === ticketId);
  }

  addTicket(ticketId) {
    this.addTicketsSubject$.next(ticketId);

    if (this.isWorkerEnabled$.getValue()) {
      // console.log('LottoPicker addTicket to worker ticketId = ' + ticketId);
      this.worker.postMessage({ command: 'add', params: [ticketId] });
    } else {
      console.log('LottoPicker addTicket to in-memory ticketId = ' + ticketId);
    }
    return this.getTicketPick$(ticketId);
  }

  resetTickets() {
    this.resetTicketsSubject$.next();
    if (this.isWorkerEnabled$.getValue()) {
      this.worker.postMessage({ command: 'reset', params: [] });
    }
  }

  startWorker(lastTicketCount) {
    if (!this.workerInitialized) {
      this.workerInitialized = true;
      // console.log('LottoPicker starting worker with ticketId = ' + lastTicketCount);
      this.worker.postMessage({ command: 'start', params: [lastTicketCount] });
    }
    else {
      // console.warn('LottoPicker startWorker cannot start worker since its
      // already initialized');
    }
  }

  stopWorker() {
    if (this.workerInitialized) {
      // console.log('LottoPicker stopping worker');
      this.worker.postMessage({ command: 'stop' });
      this.workerInitialized = false;
    } else {
      // console.debug('LottoPicker stopWorker cannot stop worker since its not
      // initialized');
    }
  }

  toggleWorker(enable) {
    // console.log('LottoPicker toggle worker = '+enable);
    this.isWorkerEnabled$.next(enable);
  }

  // initWorker() {
  //   if (!this.workerInitialized) {
  //     //this.worker = new Worker('../../workers/worker.js');
  //     this.workerPicks$ = Observable.fromEvent(this.worker, 'message').publish().refCount();
  //   } else {
  //     // console.warn('LottoPicker initWorker cannot initWorker since its already
  //     // initialized');
  //   }
  // }

  startTicksSubscription() {
    this.ticksSubscription = this.ticks$.subscribe(
      // x => console.log(x)
    );
  }

  stopTicksSubscription() {
    if (this.ticksSubscription && this.ticksSubscription.unsubscribe) {
      this.ticksSubscription.unsubscribe();
    }
  }

  getTicketCount$(addTicketsSubject$, resetTicketsSubject$, tag) {
    return Observable.merge(
      // increment
      addTicketsSubject$.asObservable()
                        .map(function (x) {
                          // console.log(tag + ' addTicketSubject$ x = ' + x);
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

  getTicks$(ticketCount$, tag) {
    return ticketCount$
      .switchMap((ticketCount, i) => {
        return Observable.interval(50).flatMap(() => {
          return Observable.range(1, ticketCount);
        });
      })
      .map(
        (ticketId) => new PickUpdate(ticketId, (Math.random() * 100).toFixed(
          2)))
      .publish().refCount();
  }
}


export class PickUpdate {
  ticketId;
  pick;

  constructor(ticketId, pick) {
    this.ticketId = ticketId;
    this.pick = pick;
  }
}

export class TicketModel {
  subscription;
  serverTicketId;
  cross = 'EUR USD';
  currency1 = 'EUR';
  currency2 = 'USD';
  ticketId;
  pick = '95.11';

  constructor(ticketId, cross) {
    this.ticketId = ticketId;
    this.cross = cross;
    this.currency1 = cross.split(' ')[0];
    this.currency2 = cross.split(' ')[1];
  }

  updatePick(update) {
    this.pick = update.pick;
    this.serverTicketId = update.ticketId;
  }
}