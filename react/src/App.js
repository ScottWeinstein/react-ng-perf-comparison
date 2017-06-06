import React, { Component } from 'react';
import './App.css';
import { GroupView } from './GroupView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketCount: 200
    };
  }

  render() {
    return (
      <div className='App'>
        <GroupView/>
      </div>
    );
  }
}

export default App;
