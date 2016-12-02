import React, { Component } from 'react';
import GameItem from '../GameItem/GameItem.js'

class GameList extends Component {
  render() {
    var games = this.props.games.map((game, i) =>
      <li key={i}>
        <GameItem
          game={game}
          />
      </li>);
    return (
      <ul>
        {games}
      </ul>
    );
  }
}

export default GameList;
