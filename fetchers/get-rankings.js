var getJson = require('../lib/get-json');

module.exports = function (videoUrl) {

  return Promise
    .all([
      getJson('http://data.nba.net/data/10s/prod/v1/2016/teams.json'),
      getJson('http://data.nba.net/data/10s/prod/v1/current/standings_conference.json'),
    ])
    .then(result => {
      var teams = result[0].league.standard;
      var rankings = result[1].league.standard.conference;
      var east = rankings.east.map(t => ({
        teamCode: getTeamCode(teams, t.teamId),
        win: t.win,
        loss: t.loss,
        behind: t.gamesBehind
      }));
      var west = rankings.west.map(t => ({
        teamCode: getTeamCode(teams, t.teamId),
        win: t.win,
        loss: t.loss,
        behind: t.gamesBehind
      }));

      return { east, west }
    });
}

function getTeamCode(teams, teamId) {
  return (teams.find(t => t.teamId === teamId) || {}).tricode;
}