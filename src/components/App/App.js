import React, { useState, useEffect } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Ranking from '../Ranking/Ranking.js';
import VideoPlayer from '../VideoPlayer/VideoPlayer.js';
import PageAnchers from '../PageAnchers/PageAnchers.js';
import moment from 'moment';

import { getData } from '../../lib/api';
import { getInitialData, gameFavLevel, FAV_TEAM_KEY } from '../../lib/utils';
import FavTeam from '../FavTeam/FavTeam';
import GameItem from '../GameItem/GameItem';

function App() {
  const [data, setData] = useState(getInitialData());
  const [currentSection, setCurrentSection] = useState(getCurrentSection());

  function loadData() {
    getData().then(newData => {
      setData({ ...data, ...newData });
    });
  }

  function getCurrentSection() {
    return (window.location.hash || '').replace('#', '') || `games-${getDefaultDate()}`;
  }

  function handleFavChange(favTeams) {
    localStorage.setItem(FAV_TEAM_KEY, JSON.stringify(favTeams));
    setData({ ...data, favTeams });
  }

  function getDefaultDate() {
    const currentHour = moment().hour();
    const isMorning = currentHour > 5 && currentHour <= 12;
    return isMorning ? 0 : 1;
  }

  function playVideo(videoUrl) {
    window.location.href = '#player';
    setData({ ...data, playingVideos: [videoUrl] });
  }

  function playAll(gameDate) {
    return () => {
      // window.location.href = '#player';
      const videos = gameDate.games.map(g => g.recapLink).filter(Boolean);
      setData({ ...data, playingVideos: videos });
    };
  }

  useEffect(() => {
    loadData();
    window.onhashchange = () => setCurrentSection(getCurrentSection());
  }, []);

  if (!data.lastUpdate) {
    return <p>Loading</p>;
  }

  if (currentSection === 'player') {
    if (!data.playingVideos) {
      return (window.location.href = '#');
    }
    return <VideoPlayer videos={data.playingVideos} />;
  }

  return (
    <div className="App">
      <Header lastUpdate={data.lastUpdate} onUpdate={loadData} />
      <div className="anchers">
        <PageAnchers gameDates={data.gameDates} currentSection={currentSection} />
      </div>

      {data.gameDates
        .map((gameDate, i) => (
          <ul className="game-list">
            {gameDate.games.map(g => g.recapLink).filter(Boolean).length > 0 && (
              <li className="play-all">
                <a className="PlayAllButton" onClick={playAll(gameDate)} href={'#player'}>
                  + <span className="PlayIcon" />
                </a>
              </li>
            )}
            {gameDate.games.map((game, i) => (
              <li key={i}>
                <GameItem
                  game={game}
                  rankings={data.rankings}
                  onPlay={playVideo}
                  favLevel={gameFavLevel(data.favTeams, [game.hTeam, game.vTeam])}
                />
              </li>
            ))}
          </ul>
        ))
        .find((g, i) => currentSection === 'games-' + i)}
      {currentSection === 'ranking' && <Ranking rankings={data.rankings} />}
      {currentSection === 'fav' && (
        <div className="fav-teams-container">
          <h4 style={{ margin: '10px 0' }}>Fav Teams</h4>
          <FavTeam favTeams={data.favTeams} onChange={handleFavChange} />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
