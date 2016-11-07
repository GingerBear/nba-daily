import React, { Component } from 'react';
import TeamIcon from '../TeamIcon/TeamIcon.js'
import {datetime} from '../../lib/utils'
import './GameItem.css'

class GameItem extends Component {
  render() {
    var game = this.props.game;
    var dateTime = datetime(game.startTimeUTC).calendar();
    var isStilPlaying = (game.period.current < 4 && game.period.current > 0) || game.clock !== '' || (game.period.isEndOfPeriod || game.period.isHalftime);
    var isEnded = !isStilPlaying && ((+game.hTeam.score) !== 0 && (+game.vTeam.score) !== 0);
    var homeWin = (+game.hTeam.score) > (+game.vTeam.score);

    var hScoreClass = isEnded ? (homeWin ? 'score win' : 'score') : 'score';
    var vScoreClass = isEnded ? (homeWin ? 'score' : 'score win') : 'score';

    var badge = isStilPlaying ? <span className="GameBadge">playing Q{game.period.current}...</span> : null;
    return (
      <div className="GameItem">
        <div className="GameDate"> {dateTime} {badge}</div>
        <div className="line">
          <div className="GameSide">
            <TeamIcon teamInfo={game.hTeam}></TeamIcon>
            <span className={hScoreClass}>{game.hTeam.score}</span>
          </div>
          <div className="GameSide">
            <span className={vScoreClass}>{game.vTeam.score}</span>
            <TeamIcon teamInfo={game.vTeam}></TeamIcon>
          </div>
          <div className="GameRecap">
            {game.recapLink ? <a className="PlayButton" href={game.recapLink}>&#9658;</a> : null }
          </div>
        </div>
        { game.nugget.text ? <p> - { game.nugget.text }</p> : null }
      </div>
    );
  }
}

export default GameItem;

