import React, { Component } from 'react';
import GameList from '../GameList/GameList.js'
import PageAnchers from '../PageAnchers/PageAnchers.js'
import { datetime } from '../../lib/utils'
import './GamesDate.css'

class GameDate extends Component {

  playVideo = (e) => {
    var isTouchDevice = 'ontouchstart' in document.documentElement;
    if (!isTouchDevice) {
      return;
    }

    e.preventDefault();

    this.videoPlayer = document.createElement('video');
    this.videoPlayer.src = e.target.href;
    this.videoPlayer.addEventListener('ended', this.onVideoEnded, false);
    this.videoPlayer.play();
  }

  onVideoEnded = (event) => {
    this.videoPlayer.webkitExitFullscreen();
  }

  render() {
    var gameDate = this.props.gameDate;
    var dateString = datetime(new Date(+gameDate.timestamp)).calendar().split('at')[0].trim();

    return (
      <div className="GamesDate" id={this.props.sectionId}>
        <div className="GamesDateHeader">
          <PageAnchers gameDates={this.props.timeStamps} currentSection={dateString} />
          {gameDate.top10Video ?
            <a className="PlayButton PlayButtonWithText" onClick={this.playVideo} href={gameDate.top10Video}>
              <span className="top-10-text">Top 10</span>
              <icon className="PlayIcon"></icon>
            </a>
            : null}
        </div>

        <GameList
          games={gameDate.games}
          />

      </div>
    );
  }
}

export default GameDate;
