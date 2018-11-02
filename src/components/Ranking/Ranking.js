import React from 'react';
import './Ranking.css';

function Ranking(props) {
  return (
    <div className="Ranking" id="ranking">
      <div className="Ranking-body">
        <ul>
          <li>
            <span className="rank" />
            West
          </li>
          {props.rankings.west.map((t, i) => (
            <li className={`rank-${i}`} key={i}>
              <span className="rank">{i + 1}</span>
              <img src={`images/${t.teamCode.toLowerCase()}.gif`} alt={t.teamCode} />
              <span className="team-name">{t.teamCode}</span>
              <span className="win-record">
                ({t.win}-{t.loss})
              </span>
              <span className="behind">+{t.behind}</span>
            </li>
          ))}
        </ul>

        <ul>
          <li>East</li>
          {props.rankings.east.map((t, i) => (
            <li className={`rank-${i}`} key={i}>
              <img src={`images/${t.teamCode.toLowerCase()}.gif`} alt={t.teamCode} />
              <span className="team-name">{t.teamCode}</span>
              <span className="win-record">
                ({t.win}-{t.loss})
              </span>
              <span className="behind">+{t.behind}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Ranking;
