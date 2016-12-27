import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header.js'
import Footer from '../Footer/Footer.js'
import GamesDate from '../GamesDate/GamesDate.js'
import { getJson } from '../../lib/utils'
import { setGlobalState, getGlobalState, subscribe } from '../../lib/global-state';

class App extends Component {
  constructor(pros) {
    super(pros);
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    subscribe(this);
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

  render() {
    var cacheData = getGlobalState();

    if (!cacheData.lastUpdate) {
      return <p>Loading</p>
    }

    var _gameDates = cacheData.gameDates;

    var gameTs = _gameDates.map(d => d.timestamp);
    var gameDates = _gameDates.map((gameDate, i) => (
      <GamesDate
        key={i}
        timeStamps={gameTs}
        gameDate={gameDate}
        sectionId={`section-${i}`}
        />

    ));
    return (
      <div className="App">
        <Header lastUpdate={cacheData.lastUpdate}></Header>
        {gameDates}
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
