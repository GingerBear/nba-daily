import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header.js'
import Footer from '../Footer/Footer.js'
import GameDate from '../GameDate/GameDate.js'
import {getJson} from '../../lib/utils'

class App extends Component {
  constructor(pros) {
    super(pros);
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    var dataURL = 'https://dl.dropboxusercontent.com/s/i2tqoo6wtt7acjx/nba-data.json';
    return getJson(dataURL)
      .then(data => {
        this.setState({
          data: data
        });
      });
  }
  render() {
    if (!this.state.data) {
      return <p>Loading</p>
    }
    var _gameDates = this.state.data.gameDates;

    var gameTs = _gameDates.map(d => d.timestamp);
    var gameDates = _gameDates.map((gameDate, i) => (
      <div key={i}>
        <GameDate timeStamps={gameTs} gameDate={gameDate} sectionId={`section-${i}`}></GameDate>
      </div>
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
