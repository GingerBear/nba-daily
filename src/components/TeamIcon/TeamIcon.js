import React, { Component } from 'react';
import { getGlobalState } from '../../lib/global-state';
import './TeamIcon.css';

class TeamIcon extends Component {
  renderRank(teamCode) {
    var rankings = getGlobalState().rankings;
    var teamRank = null;
    var conf = null;

    if (rankings.east.find(t => t.teamCode === teamCode)) {
      conf = 'e';
      teamRank = rankings.east.findIndex(t => t.teamCode === teamCode);
    } else {
      conf = 'w';
      teamRank = rankings.west.findIndex(t => t.teamCode === teamCode);
    }

    return (
      <span className={`conf-${conf}`}>
        {teamRank + 1}
      </span>
    );
  }
  render() {
    return (
      <div className='TeamIcon'>

        {this.renderRank(this.props.teamInfo.triCode)}

        <img
          src={`images/${this.props.teamInfo.triCode.toLowerCase()}.gif`}
          alt={this.props.teamInfo.triCode} />

        <span>
          {this.props.teamInfo.triCode}
          <span className="WinLoss">
            ({this.props.teamInfo.win}-{this.props.teamInfo.loss})
          </span>
        </span>
      </div>
    );
  }
}

export default TeamIcon;
