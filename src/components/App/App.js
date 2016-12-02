import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header.js'
import Footer from '../Footer/Footer.js'
import GamesDate from '../GamesDate/GamesDate.js'
import { getJson } from '../../lib/utils'
import { setState, getState } from '../../lib/global-state';

class App extends Component {
  constructor(pros) {
    super(pros);
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    window.onbeforeunload = document.pagehide = document.unload = function (e) {
      setState({
        scrollPosition: window.scrollY
      });
    };

    var dataURL = 'https://dl.dropboxusercontent.com/s/i2tqoo6wtt7acjx/nba-data.json';
    return getJson(dataURL)
      .then(data => {
        this.setState({
          data: data
        });

        // set global state
        setState({
          rankings: this.state.data.rankings
        });

        window.scrollTo(0, getState().scrollPosition);
      });
  }
  render() {
    if (!this.state.data) {
      return <p>Loading</p>
    }
    var _gameDates = this.state.data.gameDates;

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
        <Header lastUpdate={this.state.data.lastUpdate}></Header>
        {gameDates}
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
