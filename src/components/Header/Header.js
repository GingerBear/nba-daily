import React, { Component } from 'react';
import { datetime } from '../../lib/utils';
import './Header.css';

class Header extends Component {
  render() {
    var lastUpdate = datetime(this.props.lastUpdate).fromNow();
    return (
      <header id="header">
        <h1>NBA Daily</h1>
        <span className='LastUpdate'>updated {lastUpdate}</span>
      </header>
    );
  }
}

export default Header;
