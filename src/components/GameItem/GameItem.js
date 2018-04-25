import React, { Component } from "react";
import TeamIcon from "../TeamIcon/TeamIcon.js";
import { datetime } from "../../lib/utils";
import { getGlobalState, setGlobalState } from "../../lib/global-state";
import "./GameItem.css";

const isTouchDevice = "ontouchstart" in document.documentElement;

class GameItem extends Component {
  playVideo = e => {
    if (!isTouchDevice) return;

    e.preventDefault();
    setGlobalState({
      videoPlaying: e.target.href
    });
  };

  render() {
    var favTeams = getGlobalState().favTeams;

    var game = this.props.game;
    var dateTime = datetime(game.startTimeUTC).calendar();
    var isStilPlaying =
      (game.period.current < 4 && game.period.current > 0) ||
      game.clock !== "" ||
      (game.period.isEndOfPeriod || game.period.isHalftime);
    var isEnded =
      !isStilPlaying && (+game.hTeam.score !== 0 && +game.vTeam.score !== 0);
    var homeWin = +game.hTeam.score > +game.vTeam.score;

    var hScoreClass = isEnded ? (homeWin ? "score win" : "score") : "score";
    var vScoreClass = isEnded ? (homeWin ? "score" : "score win") : "score";

    var badge = isStilPlaying ? (
      <span className="GameBadge">playing Q{game.period.current}...</span>
    ) : null;

    var isFavTeam = containsFavTeams(favTeams, [game.hTeam, game.vTeam]);
    var GameItemClassName = "GameItem" + (isFavTeam ? " isFavTeam" : "");
    var watch = (game.watch.broadcast.broadcasters.national || [])
      .map(b => b.shortName)
      .join("");
    var playoffsSummary = game.playoffs && game.playoffs.seriesSummaryText;
    var gameNote = game.nugget.text ? game.nugget.text : watch;

    return (
      <div className={GameItemClassName}>
        <div className="GameDate">
          {dateTime} {badge}
        </div>
        <div className="line">
          <div className="GameSide">
            <TeamIcon teamInfo={game.hTeam} />
            <span className={hScoreClass}>{game.hTeam.score}</span>
          </div>

          <div className="GameSide">
            <span className={vScoreClass}>{game.vTeam.score}</span>
            <TeamIcon teamInfo={game.vTeam} />
          </div>

          <div className="GameRecap">
            {game.recapLink ? (
              <a
                className="PlayButton"
                onClick={this.playVideo}
                href={game.recapLink}
              >
                <icon className="PlayIcon" />
              </a>
            ) : null}
          </div>
        </div>
        <p>
          {playoffsSummary} | {gameNote}
        </p>
      </div>
    );
  }
}

function containsFavTeams(favTeams, gameTeams) {
  var favCodes = favTeams.map(f => f.value);
  return (
    favCodes.indexOf(gameTeams[0].triCode.toLowerCase()) > -1 ||
    favCodes.indexOf(gameTeams[1].triCode.toLowerCase()) > -1
  );
}

export default GameItem;
