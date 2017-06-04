import React, { Component } from 'react';
import { format } from 'd3-format';

export default class Tile extends Component {
 constructor(props) {
    super(props);
    this.state = this.newTick();
    this.format = format(".2f");
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  newTick() {
    return {
        cross: [ 
          { name: 'A', price: Math.random() },
          { name: 'B', price: Math.random() },
          { name: 'C', price: Math.random() },
          { name: 'D', price: Math.random() },
          { name: 'E', price: Math.random() },
          { name: 'F', price: Math.random() },
        ]
      }
  }

  componentDidMount() {
    setInterval(() => this.setState(this.newTick()), 10);
  }

  render() {
    return <div className='Tile'>
      {this.state.cross[0].name}
      {this.format(this.state.cross[0].price)}

      {this.state.cross[1].name}
      {this.format(this.state.cross[1].price)}

      {this.state.cross[2].name}
      {this.format(this.state.cross[2].price)}

      {this.state.cross[3].name}
      {this.format(this.state.cross[3].price)}

      {this.state.cross[4].name}
      {this.format(this.state.cross[4].price)}

      {this.state.cross[5].name}
      {this.format(this.state.cross[5].price)}
    </div>
  }
}
