import React from 'react';
import './Footer.css';

function Footer(props) {
  var style = {
    paddingBottom: 10,
    textDecoration: 'none',
    color: '#555',
    display: 'block',
    textAlign: 'right'
  };

  return (
    <footer>
      <br />
      <ul>
        <li>
          <a style={style} href="https://github.com/gingerbear/nba-daily">
            Github
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
