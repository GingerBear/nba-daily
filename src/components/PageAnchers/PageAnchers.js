import React, { Component } from 'react';
import { datetime } from '../../lib/utils';
import './PageAnchers.css'

class PageAnchers extends Component {
  render() {
    var gameDates = this.props.gameDates;

    var dateString = gameDates.map(ts =>
      datetime(new Date(+ts)).calendar().split('at')[0].trim()
    ).map((date, i) => (
      <li key={i}>{
        date === this.props.currentSection ?
          <span>{date}</span> :
          <a href={`#section-${i}`}>{date}</a>
      }</li>
    ));

    return (
      <ul className="PageAnchers">
        {dateString}
        <li>{
          'ranking' === this.props.currentSection ?
            <span>Ranking</span> :
            <a href={`#ranking`}>Ranking</a>
        }</li>
      </ul>
    );
  }
}

export default PageAnchers;
