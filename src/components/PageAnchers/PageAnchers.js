import React from 'react';
import { datetime } from '../../lib/utils';
import './PageAnchers.css';

function PageAnchers(props) {
  return (
    <ul className="PageAnchers">
      {props.gameDates.map((gameDate, i) => {
        const date = datetime(new Date(+gameDate.timestamp))
          .calendar()
          .split('at')[0]
          .trim();

        const selected = `games-${i}` === props.currentSection;

        return (
          <li className={selected ? 'selected' : ''} key={i}>
            {selected ? <span>{date}</span> : <a href={`#games-${i}`}>{date}</a>}
          </li>
        );
      })}
      <li>
        {'ranking' === props.currentSection ? (
          <span>Ranking</span>
        ) : (
          <a href={`#ranking`}>Ranking</a>
        )}
      </li>
      {/* <li>{'fav' === props.currentSection ? <span>Fav</span> : <a href={`#fav`}>Fav</a>}</li> */}
    </ul>
  );
}

export default PageAnchers;
