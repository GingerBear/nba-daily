import React, { Component } from 'react';
import { datetime } from '../../lib/utils';
import { getData } from '../../lib/api';
import { setGlobalState, getGlobalState, subscribe, unsubscribe } from '../../lib/global-state';
import './Header.css';

class Header extends Component {
  componentDidMount() {
    subscribe(this);
  }

  componentWillUnmount() {
    unsubscribe(this);
  }

  handleLogoPress = () => {
    setGlobalState({
      isFetching: true
    });

    getData().then(data => {
      setGlobalState({
        isFetching: false,
        lastUpdate: data.lastUpdate,
        gameDates: data.gameDates,
        rankings: data.rankings
      });
    });
  };

  render() {
    var globalData = getGlobalState();
    var lastUpdate = datetime(this.props.lastUpdate).fromNow();
    return (
      <header id="header">
        <h1>NBA Daily</h1>
        {globalData.isFetching ? (
          <span>loading...</span>
        ) : (
          <a href="/#" onClick={this.handleLogoPress} className="LastUpdate">
            updated {lastUpdate}
          </a>
        )}
      </header>
    );
  }
}

export default Header;
