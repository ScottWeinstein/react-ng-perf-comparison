import { TicketModel, LottoPicker } from './LottoPicker';
import React, { Component } from 'react';
import Ticket from './Ticket';

export class GroupView extends Component {
  initialQuantity = 0;
  initTime = 0;
  selectedItems = [];
  ticketId = 0;

  render() {
    return (
      <div>
        <div className='tickets'>
          {
            this.selectedItems.map(ii => <Ticket key={ii.ticketId} {...ii} />)
          }
        </div>
      </div>);
  }

  constructor(props) {
    super(props);
    this.initialQuantity = props.initialQuantity;
    this.picker = new LottoPicker();
  }

  componentWillMount() {
    console.log('GroupView initial quantity = ' + this.initialQuantity);
    this.initTime = window.performance.now();
    this.addPairs(this.initialQuantity);
  }

  componentDidMount() {
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
    let maxTicketId = 0;
    for (let i = 0; i < numberToAdd; i++) {
      let t = this.getNewTicket('A');
      t.subscription = this.picker.addTicket(t.ticketId);
      this.selectedItems.push(t);
      if (i === numberToAdd - 1) {
        maxTicketId = t.ticketId;
      }
    }
  }

  getNewTicket(selectedGame) {
    return new TicketModel(this.getNextTicketId(), selectedGame);
  }

}


