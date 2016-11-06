var getJson = require('../lib/get-json');


module.exports = function(date) {
  var url = `http://data.nba.net/data/10s/prod/v1/${date}/scoreboard.json`;
  return getJson(url);
}