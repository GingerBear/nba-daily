import React from 'react';
import './TeamIcon.css';

function TeamIcon(props) {
  function renderRank(teamCode) {
    let teamRank = null;
    let conf = null;

    if (props.rankings.east.find(t => t.teamCode === teamCode)) {
      conf = 'e';
      teamRank = props.rankings.east.findIndex(t => t.teamCode === teamCode);
    } else {
      conf = 'w';
      teamRank = props.rankings.west.findIndex(t => t.teamCode === teamCode);
    }

    return <span className={`conf-${conf}`}>{teamRank + 1}</span>;
  }

  return (
    <div className="TeamIcon">
      {renderRank(props.teamInfo.triCode)}

      <img
        src={`images/${props.teamInfo.triCode.toLowerCase()}.gif`}
        alt={props.teamInfo.triCode}
      />
    </div>
  );
}

export default TeamIcon;
