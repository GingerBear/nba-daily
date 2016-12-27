import React, { Component } from 'react';
import { getGlobalState } from '../../lib/global-state';
import './TeamIcon.css';

class TeamIcon extends Component {
  renderRank(rk) {
    var rkNum = rk.replace('e', '').replace('w', '');
    return <span className={`conf-${rk[0]}`}>{rkNum}</span>;
  }
  render() {
    var rankings = getGlobalState().rankings;
    return (
      <div className='TeamIcon'>
        {this.renderRank(rankings[this.props.teamInfo.triCode])}
        <img src={`images/${this.props.teamInfo.triCode.toLowerCase()}.gif`} alt={this.props.teamInfo.triCode} />
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
