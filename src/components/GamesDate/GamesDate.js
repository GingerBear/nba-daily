import React, { Component } from 'react';
import GameList from '../GameList/GameList.js'
import PageAnchers from '../PageAnchers/PageAnchers.js'
import { datetime } from '../../lib/utils'
import { setGlobalState } from '../../lib/global-state';
import './GamesDate.css'

const isTouchDevice = 'ontouchstart' in document.documentElement;

class GameDate extends Component {

  playVideo = (e) => {
    if (!isTouchDevice) return;

    e.preventDefault();
    setGlobalState({
      videoPlaying: e.target.href
    });
  }

  render() {
    var gameDate = this.props.gameDate;
    var dateString = datetime(new Date(+gameDate.timestamp)).calendar().split('at')[0].trim();

    return (
      <div className="GamesDate" id={this.props.sectionId}>
        <div className="GamesDateHeader">
          {gameDate.top10Video ?
            <a className="PlayButton PlayButtonWithText" onClick={this.playVideo} href={gameDate.top10Video}>
              <span className="top-10-text">Top 10</span>
              <icon className="PlayIcon"></icon>
            </a>
            : null}
          <PageAnchers gameDates={this.props.timeStamps} currentSection={dateString} />
        </div>

        <GameList
          games={gameDate.games}
        />

      </div>
    );
  }
}

export default GameDate;
