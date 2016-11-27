import React, { Component } from 'react';
import FavTeam from '../FavTeam/FavTeam'
import './Footer.css'

class Footer extends Component {

  constructor() {
    super();
  }

  render() {
    var style = {
      paddingBottom: 10,
      textDecoration: 'none',
      color: '#555',
      display: 'block',
      textAlign: 'right'
    };

    return (
      <footer>
        <div><a href="#header" className="GoToTop">Top</a></div>

        <h4 style={{ margin: '10px 0' }}>Fav Teams</h4>
        <FavTeam />
        <br />
        <ul>
          <li><a style={style} href="https://github.com/gingerbear/nba-daily">Github</a></li>
        </ul>
      </footer>
    );
  }
}

export default Footer;
