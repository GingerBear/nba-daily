var getJson = require('../lib/get-json');

module.exports = function getVideoLink(videoUrl) {

  return Promise.all([
    getJson('http://data.nba.net/data/10s/prod/v1/2016/teams.json'),
    getJson('http://data.nba.net/data/10s/prod/v1/current/standings_conference.json'),
  ]).then(result => {
    var teams = result[0].league.standard;
    var rankings = result[1].league.standard.conference;

    var getRankByTeamId = genGetRankByTeamId(rankings);

    var nbaTeamRank = teams
      .filter(t => t.isNBAFranchise)
      .map(t => ({
        teamCode: t.tricode,
        rank: getRankByTeamId(t.teamId)
      }))
      .reduce((acc, curr) => {
        acc[curr.teamCode] = curr.rank;
        return acc;
      }, {});

    return Promise.resolve(nbaTeamRank);
  });
}

function genGetRankByTeamId(rankings) {
  return (teamId) => {

    var eastRank = rankings.east.reduce((acc, curr, i) =>
      teamId === curr.teamId ? `e${i + 1}` : acc
      , '');

    var westRank = rankings.west.reduce((acc, curr, i) =>
      teamId === curr.teamId ? `w${i + 1}` : acc
      , '');

    return eastRank || westRank;
  }
}