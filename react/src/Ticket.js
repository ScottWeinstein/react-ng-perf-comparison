import React, { Component } from 'react';
export default class Ticket extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.subscription = props.subscription.timeInterval();
    this.ticketId = props.ticketId;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  componentDidMount() {
    this.subscription.subscribe((x) => {
      // console.log(this.ticketId + ' ' + JSON.stringify(x));
      this.setState({ pick: x.value.pick, interval: x.interval });
      // setInterval(() => this.setState(this.newTick()), 50);
    });
  }

  render() {
    return <ticket>
      <div className='ticket'>
        TicketId: {this.props.ticketId}
        <br />
        {
          `
          ${this.state.interval}
          ${this.state.pick}
          `
        }
      </div>
    </ticket>
  }
}
