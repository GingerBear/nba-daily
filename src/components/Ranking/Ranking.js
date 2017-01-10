import React, { Component } from 'react';
import PageAnchers from '../PageAnchers/PageAnchers.js'
import { getGlobalState } from '../../lib/global-state';
import _ from 'lodash';
import './Ranking.css';

class Ranking extends Component {
  render() {

    var rankings = getGlobalState().rankings;
    var ranks = _.map(rankings, (v, k) => ({
      conf: v.replace(/\d+/g, ''),
      team: k,
      rank: v.replace(/[we]/, '')
    }));

    var east = ranks.filter(r => r.conf === 'e');
    var west = ranks.filter(r => r.conf === 'w');
    east.sort((a, b) => a.rank - b.rank);
    west.sort((a, b) => a.rank - b.rank);

    return <div className="Ranking" id="ranking">
      <div className="Ranking-header">
        <h3>Ranking</h3>
        <PageAnchers gameDates={this.props.timeStamps} currentSection="ranking" />
      </div>
      <div className="Ranking-body">
        <ul>
          <li><span className="rank"></span>East</li>
          {west.map(t => <li className={`rank-${t.rank}`}>
            <span className="rank">{t.rank}</span>
            <img src={`images/${t.team.toLowerCase()}.gif`} alt={t.team} />
            <span>{t.team}</span></li>)}
        </ul>
        <ul>
          <li>West</li>
          {east.map(t => <li className={`rank-${t.rank}`}>
            <img src={`images/${t.team.toLowerCase()}.gif`} alt={t.team} />
            <span>{t.team}</span></li>)}
        </ul>
      </div>
    </div>;
  }
}

export default Ranking;
