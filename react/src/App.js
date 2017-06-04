import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import Tile from './Tile';

class App extends Component {
 constructor(props) {
    super(props);
    this.state = {
      tileCount: 20
    };
  }

  render() {
    return (
      <div className='App'>
        <input type='number' value={this.state.tileCount} onChange={(e)=>this.setState({ tileCount: e.target.value })} />
        <div className='tiles'>
        {
          _.range(0, this.state.tileCount).map(ii => <Tile key={ii} />)
        }
        </div>
      </div>
    );
  }
}

export default App;
