import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header.js'
import Footer from '../Footer/Footer.js'
import GamesDate from '../GamesDate/GamesDate.js'
import Ranking from '../Ranking/Ranking.js'
import VideoPlayer from '../VideoPlayer/VideoPlayer.js'

import { getJson } from '../../lib/utils'
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

    var dataURL = 'https://dl.dropboxusercontent.com/s/i2tqoo6wtt7acjx/nba-data.json';
    return getJson(dataURL)
      .then(data => {
        // set global state
        setGlobalState({
          lastUpdate: data.lastUpdate,
          gameDates: data.gameDates,
          rankings: data.rankings
        });
      });
  }

  componentWillUnmount() {
    unsubscribe(this);
  }

  goToSection = () => {
    setGlobalState({
      currentSection: (location.hash || '').replace('#', '') || 'section-0'
    });
  }

  render() {
    var globalData = getGlobalState();

    if (!globalData.lastUpdate) {
      return <p>Loading</p>
    }

    var _gameDates = globalData.gameDates;

    var gameTs = _gameDates.map(d => d.timestamp);
    var gameDates = _gameDates.map((gameDate, i) => (
      globalData.currentSection === `section-${i}`
        ? <GamesDate
          key={i}
          timeStamps={gameTs}
          gameDate={gameDate}
          sectionId={`section-${i}`}
        />
        : null

    ));
    return (
      <div className="App">
        <Header lastUpdate={globalData.lastUpdate}></Header>
        {gameDates}
        <Ranking timeStamps={gameTs} />
        <Footer></Footer>

        <VideoPlayer video={globalData.videoPlaying} />
      </div>
    );
  }
}

export default App;
