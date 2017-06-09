import React, { Component } from 'react';
export default class Ticket extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.updates$ = props.updates$.timeInterval();
    this.ticketId = props.ticketId;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  componentDidMount() {
    this.updates$.subscribe((x) => {
      this.setState({ pick: x.value.pick, interval: x.interval });
    });
  }

  render() {
    return <div className='ticket'>
        TicketId: {this.props.ticketId}
        <br />
        {
          `
          ${this.state.interval}
          ${this.state.pick}
          `
        }
      </div>
  }
}
