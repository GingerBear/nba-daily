import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import GamesDate from '../GamesDate/GamesDate.js';
import Ranking from '../Ranking/Ranking.js';
import VideoPlayer from '../VideoPlayer/VideoPlayer.js';
import PageAnchers from '../PageAnchers/PageAnchers.js';
import moment from 'moment';

import { getData } from '../../lib/api';
import { setGlobalState, getGlobalState, subscribe, unsubscribe } from '../../lib/global-state';

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
      data.gameDates = this.sortGames(data.gameDates);
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
  sortGames(games) {
    const today = games[0];
    const yesterdays = games[1];
    const currentHour = moment().hour();
    const isMorning = currentHour > 5 && currentHour <= 12;
    if (isMorning) {
      return [yesterdays, today, games[2]];
    } else {
      return [today, yesterdays, games[2]];
    }
  }

  componentWillUnmount() {
    unsubscribe(this);
  }

  goToSection = () => {
    setGlobalState({
      currentSection: (window.location.hash || '').replace('#', '') || 'games'
    });
  };

  render() {
    var globalData = getGlobalState();

    if (!globalData.lastUpdate) {
      return <p>Loading</p>;
    }

    var _gameDates = globalData.gameDates;

    var gameTs = _gameDates.map(d => d.timestamp);
    var gameDates = _gameDates.map((gameDate, i) => (
      <GamesDate key={i} timeStamps={gameTs} gameDate={gameDate} sectionId={`section-${i}`} />
    ));
    return (
      <div className="App">
        <Header lastUpdate={globalData.lastUpdate} />
        <div className="anchers">
          <PageAnchers currentSection={globalData.currentSection} />
        </div>
        {globalData.currentSection === 'games' && gameDates}
        {globalData.currentSection === 'ranking' && <Ranking timeStamps={gameTs} />}
        <Footer />

        <VideoPlayer video={globalData.videoPlaying} />
      </div>
    );
  }
}

export default App;
