import React, { Component } from 'react';
import './App.css';
import { GroupView } from './GroupView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialQuantity: 500
    };
  }

  render() {
    return (
      <div className='App'>
        React Tickets Instantiated: {this.state.initialQuantity}
        <GroupView initialQuantity={this.state.initialQuantity}/>
      </div>
    );
  }
}

export default App;
