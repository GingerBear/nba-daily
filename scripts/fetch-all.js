var http = require('http');
var helpers = require('../lib/helpers');
var _ = require('lodash');
var getGamesByDate = require('../fetchers/get-games-by-date');
var getGameRecap = require('../fetchers/get-game-recap');
var fs = require('fs');

var Dropbox = require('dropbox');
var dbx = new Dropbox({ accessToken: 'Zxv33fuUTboAAAAAAAAFeeUNAicuJ3F-_STjNzu6XogHXFcJySyZqO1kuLyH7duT' });

http.globalAgent.maxSockets = Infinity;


// dbx.filesUpload({path: '/data.json', contents: fs.readFileSync('../data.json')})
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.error(error);
//   });

dbx.filesListFolder({path: ''})
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

// var today = helpers.datetime(new Date());
// var yesterday = helpers.datetime(new Date()).subtract(1, 'days');

// var datesToFetch = [
//   fetchGameWithVideoByDate(today.format('YYYYMMDD')),
//   fetchGameWithVideoByDate(yesterday.format('YYYYMMDD'))
// ];

// Promise.all(datesToFetch).then(result => {
//   console.log(result);
//   fs.writeFileSync('/Users/neilding/Projects/nba-daily/data.json', JSON.stringify(result));
// });

// function fetchGameWithVideoByDate(dateString) {
//   return getGamesByDate(dateString).then(json => {
//     var getRecaps = json.games.map(g => getGameRecap(g.gameId));
//     return Promise.all(getRecaps)
//       .then(recapLinks => {

//         json.games.forEach(g => {
//           g.recapLink = _.find(recapLinks, { gameId: g.gameId }).recapLink;
//         });

//         return Promise.resolve(json);
//       });
//   })
// }

// function uploadFile(filename, content) {
//   return dbx.filesUpload({path: '/' + file.name, contents: content});
// }