import React, { Component } from 'react';
import PageAnchers from '../PageAnchers/PageAnchers.js'
import { getGlobalState } from '../../lib/global-state';
import _ from 'lodash';
import './Ranking.css';

class Ranking extends Component {
  render() {

    var { rankings, currentSection } = getGlobalState();
    if (currentSection !== 'ranking') return null;

    return <div className="Ranking" id="ranking">

      <div className="Ranking-header">
        <h3>Ranking</h3>
        <PageAnchers gameDates={this.props.timeStamps} currentSection="ranking" />
      </div>

      <div className="Ranking-body">

        <ul>
          <li><span className="rank"></span>East</li>
          {rankings.west.map((t, i) => (
            <li className={`rank-${i}`} key={i}>
              <span className="rank">{i + 1}</span>
              <img src={`images/${t.teamCode.toLowerCase()}.gif`} alt={t.teamCode} />
              <span className="team-name">{t.teamCode}</span>
              <span className="win-record">({t.win}-{t.loss})</span>
              <span className="behind">+{t.behind}</span>
            </li>
          ))}
        </ul>

        <ul>
          <li>West</li>
          {rankings.east.map((t, i) => (
            <li className={`rank-${i}`} key={i}>
              <img src={`images/${t.teamCode.toLowerCase()}.gif`} alt={t.teamCode} />
              <span className="team-name">{t.teamCode}</span>
              <span className="win-record">({t.win}-{t.loss})</span>
              <span className="behind">+{t.behind}</span>
            </li>
          ))}
        </ul>

      </div>
    </div>;
  }
}

export default Ranking;
