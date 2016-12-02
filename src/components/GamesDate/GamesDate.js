import React, { Component } from 'react';
import GameList from '../GameList/GameList.js'
import PageAnchers from '../PageAnchers/PageAnchers.js'
import { datetime } from '../../lib/utils'
import './GamesDate.css'

class GameDate extends Component {

  playVideo = (e) => {
    e.preventDefault();
    var videoPlayer = this.refs.video;
    var isTouchDevice = 'ontouchstart' in document.documentElement;

    if (!isTouchDevice) {
      window.location.href = videoPlayer.children[0].src;
      return;
    }

    videoPlayer.addEventListener('ended', this.onVideoEnded, false);
    videoPlayer.play();
  }

  onVideoEnded = (event) => {
    var videoPlayer = this.refs.video;
    videoPlayer.webkitExitFullscreen();
  }

  render() {
    var gameDate = this.props.gameDate;
    var dateString = datetime(new Date(+gameDate.timestamp)).calendar().split('at')[0].trim();

    return (
      <div className="GamesDate" id={this.props.sectionId}>
        <div className="GamesDateHeader">
          <PageAnchers gameDates={this.props.timeStamps} currentSection={dateString} />
          {gameDate.top10Video ?
            <a className="PlayButton PlayButtonWithText" onClick={this.playVideo}>
              <span className="top-10-text">Top 10</span>
              <icon className="PlayIcon"></icon>
            </a>
            : null}
        </div>

        <video ref="video" style={{ display: 'none' }}>
          <source src={gameDate.top10Video} type="video/mp4" />
        </video>

        <GameList
          games={gameDate.games}
          />

      </div>
    );
  }
}

export default GameDate;
