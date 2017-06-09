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
        Source Repo: <a href="https://github.com/ScottWeinstein/react-ng-perf-comparison">
        https://github.com/ScottWeinstein/react-ng-perf-comparison</a>
        <br />
        React Tickets Instantiated: {this.state.initialQuantity} | Update Speed: 50ms
        <GroupView initialQuantity={this.state.initialQuantity}/>
      </div>
    );
  }
}

export default App;
