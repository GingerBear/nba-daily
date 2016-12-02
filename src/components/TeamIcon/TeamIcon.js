import React, { Component } from 'react';
import { getState } from '../../lib/global-state';
import './TeamIcon.css';

class TeamIcon extends Component {
  render() {
    var rankings = getState().rankings;
    return (
      <div className='TeamIcon'>
        <img src={`images/${this.props.teamInfo.triCode.toLowerCase()}.gif`} alt={this.props.teamInfo.triCode} />
        <span>
          {this.props.teamInfo.triCode}
          <span className="WinLoss">
            ({this.props.teamInfo.win}-{this.props.teamInfo.loss}) {rankings[this.props.teamInfo.triCode]}
          </span>
        </span>
      </div>
    );
  }
}

export default TeamIcon;
