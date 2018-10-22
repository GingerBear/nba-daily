import React, { Component } from 'react';
import { datetime } from '../../lib/utils';
import './PageAnchers.css';

class PageAnchers extends Component {
  render() {
    return (
      <ul className="PageAnchers">
        {this.props.gameDates.map((gameDate, i) => {
          const date = datetime(new Date(+gameDate.timestamp))
            .calendar()
            .split('at')[0]
            .trim();

          return (
            <li key={i}>
              {`games-${i}` === this.props.currentSection ? (
                <span>{date}</span>
              ) : (
                <a href={`#games-${i}`}>{date}</a>
              )}
            </li>
          );
        })}
        <li>
          {'ranking' === this.props.currentSection ? (
            <span>Ranking</span>
          ) : (
            <a href={`#ranking`}>Ranking</a>
          )}
        </li>
      </ul>
    );
  }
}

export default PageAnchers;
