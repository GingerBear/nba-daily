import React from 'react';
import { datetime } from '../../lib/utils';
import './Header.css';

function Header(props) {
  var lastUpdate = datetime(props.lastUpdate).fromNow();
  return (
    <header id="header">
      <h1>NBA Daily</h1>
      <button onClick={props.onUpdate} className="LastUpdate">
        updated {lastUpdate}
      </button>
    </header>
  );
}

export default Header;
