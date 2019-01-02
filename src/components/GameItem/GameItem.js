import React from 'react';
import TeamIcon from '../TeamIcon/TeamIcon.js';
import { datetime } from '../../lib/utils';
import './GameItem.css';

function GameItem(props) {
  function playVideo(e) {
    e.preventDefault();
    props.onPlay(e.target.href);
  }

  const game = props.game;
  const dateTime = datetime(game.startTimeUTC).format('LT');
  const isStilPlaying =
    (game.period.current < 4 && game.period.current > 0) ||
    game.clock !== '' ||
    (game.period.isEndOfPeriod || game.period.isHalftime);
  const isEnded = !isStilPlaying && (+game.hTeam.score !== 0 && +game.vTeam.score !== 0);
  const homeWin = +game.hTeam.score > +game.vTeam.score;

  const hScoreClass = isEnded ? (homeWin ? 'score win' : 'score') : 'score';
  const vScoreClass = isEnded ? (homeWin ? 'score' : 'score win') : 'score';

  const badge = isStilPlaying ? (
    <span className="GameBadge">
      playing Q{game.period.current}
      ...
    </span>
  ) : null;

  const gameItemClassName = `GameItem fav-level-${props.favLevel}`;
  const watch = (game.watch.broadcast.broadcasters.national || []).map(b => b.shortName).join('');
  const playoffsSummary = (game.playoffs && game.playoffs.seriesSummaryText) || '';
  const gameNote = [playoffsSummary, game.nugget.text ? game.nugget.text : watch]
    .filter(Boolean)
    .join(' | ');

  return (
    <div className={gameItemClassName}>
      <div className="GameDate">
        {dateTime} {badge}
        {gameNote ? <p>{gameNote}</p> : null}
      </div>
      <div className="line">
        <div className="GameSide">
          <TeamIcon rankings={props.rankings} teamInfo={game.hTeam} />
          <span className={hScoreClass}>{game.hTeam.score}</span>
        </div>

        <div className="GameSide">
          <span className={vScoreClass}>{game.vTeam.score}</span>
          <TeamIcon rankings={props.rankings} teamInfo={game.vTeam} />
        </div>

        <div className="GameRecap">
          {game.recapLink ? (
            <a className="PlayButton" onClick={playVideo} href={game.recapLink}>
              <span className="PlayIcon" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default GameItem;
