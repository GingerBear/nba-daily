var _ = require('lodash');
var getGamesByDate = require('../fetchers/get-games-by-date');
var getGameRecap = require('../fetchers/get-game-recap');

module.exports = function fetchGameWithVideoByDate(dateString) {
  return getGamesByDate(dateString).then(json => {
    var getRecaps = json.games.map(g => getGameRecap(g.gameId));

    return Promise.all(getRecaps)
      .then(recapLinks => {

        json.games.forEach(g => {
          g.recapLink = _.find(recapLinks, { gameId: g.gameId }).recapLink;
        });

        return Promise.resolve(json);
      });
  })
}