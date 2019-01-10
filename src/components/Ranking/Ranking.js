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
            <li
              className={`rank-${i} ${props.favTeams.indexOf(t.teamCode) > -1 ? 'fav' : ''}`}
              key={i}
              onClick={handleClick(props, t)}
            >
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
            <li
              className={`rank-${i} ${props.favTeams.indexOf(t.teamCode) > -1 ? 'fav' : ''}`}
              key={i}
              onClick={handleClick(props, t)}
            >
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

function handleClick(props, t) {
  return () => {
    if (props.favTeams && props.favTeams.indexOf(t.teamCode) > -1) {
      props.onFavChange(props.favTeams.filter(f => f !== t.teamCode));
    } else {
      props.onFavChange([...props.favTeams, t.teamCode]);
    }
  };
}

export default Ranking;
