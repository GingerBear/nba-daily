import React, { Component } from 'react';
import GameList from '../GameList/GameList.js'
import PageAnchers from '../PageAnchers/PageAnchers.js'
import {datetime} from '../../lib/utils'
import './GameDate.css'

class GameDate extends Component {
  render() {
    var gameDate = this.props.gameDate;
    var dateString = datetime(new Date(+gameDate.timestamp)).calendar().split('at')[0].trim();

    return (
      <div className="GameDate" id={this.props.sectionId}>
        <div className="GameDateHeader">
          <PageAnchers gameDates={this.props.timeStamps} currentSection={dateString}></PageAnchers>
          {gameDate.top10Video ? <a className="PlayButton PlayButtonWithText" href={gameDate.top10Video}><span className="top-10-text">Top 10</span> <icon className="PlayIcon"></icon></a> : null }
        </div>

        <GameList games={gameDate.games}></GameList>

      </div>
    );
  }
}

export default GameDate;
