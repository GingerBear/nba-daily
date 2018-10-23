import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Ranking from '../Ranking/Ranking.js';
import VideoPlayer from '../VideoPlayer/VideoPlayer.js';
import PageAnchers from '../PageAnchers/PageAnchers.js';
import moment from 'moment';

import { getData } from '../../lib/api';
import { setGlobalState, getGlobalState, subscribe, unsubscribe } from '../../lib/global-state';
import GameList from '../GameList/GameList';
import FavTeam from '../FavTeam/FavTeam';

class App extends Component {
  constructor(pros) {
    super(pros);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    subscribe(this);

    window.onhashchange = this.goToSection;
    this.goToSection();

    return getData().then(data => {
      // set global state
      setGlobalState({
        lastUpdate: data.lastUpdate,
        gameDates: data.gameDates,
        rankings: data.rankings
      });
    });
  }

  /**
   * if current
   * - 6am to 1pm: yesterday, today, tomorrow
   * - 1pm to 6am: today, yesterday, tomroow
   */
  getDefaultDate() {
    const currentHour = moment().hour();
    const isMorning = currentHour > 5 && currentHour <= 12;
    return isMorning ? 0 : 1;
  }

  componentWillUnmount() {
    unsubscribe(this);
  }

  goToSection = () => {
    setGlobalState({
      currentSection:
        (window.location.hash || '').replace('#', '') || `games-${this.getDefaultDate()}`
    });
  };

  render() {
    var globalData = getGlobalState();

    if (!globalData.lastUpdate) {
      return <p>Loading</p>;
    }

    var gameDates = globalData.gameDates.map((gameDate, i) => (
      <GameList key={i} games={gameDate.games} />
    ));

    return (
      <div className="App">
        <Header lastUpdate={globalData.lastUpdate} />
        <div className="anchers">
          <PageAnchers
            gameDates={globalData.gameDates}
            currentSection={globalData.currentSection}
          />
        </div>
        {gameDates.filter((g, i) => globalData.currentSection === 'games-' + i)[0]}
        {globalData.currentSection === 'ranking' && <Ranking />}
        {globalData.currentSection === 'fav' && (
          <div className="fav-teams-container">
            <h4 style={{ margin: '10px 0' }}>Fav Teams</h4>
            <FavTeam />
          </div>
        )}
        <Footer />

        <VideoPlayer video={globalData.videoPlaying} />
      </div>
    );
  }
}

export default App;
