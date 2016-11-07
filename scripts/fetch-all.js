var http = require('http');
var helpers = require('../lib/helpers');
var uploadDropbox = require('../lib/update-dropbox');
var fetchGameWithVideoByDate = require('../fetchers/get-games-with-recap-by-date.js');
var getTop10ByDates = require('../fetchers/get-top10-by-dates.js');

http.globalAgent.maxSockets = Infinity;

var today = helpers.datetime(new Date());
var yesterday = helpers.datetime(new Date()).subtract(1, 'days');
var tomorrow = helpers.datetime(new Date()).add(1, 'days');

var datesToFetch = [
  today,
  yesterday,
  tomorrow
];

var datesGamesToFetch = Promise.all(datesToFetch.map(d => fetchGameWithVideoByDate(d.format('YYYYMMDD'))));
var datesTop10ToFetch = getTop10ByDates(datesToFetch.map(d => d.format('YYYYMMDD')));

Promise.all([
    datesGamesToFetch,
    datesTop10ToFetch
  ])
  .then(result => {
    console.log(result);
    var gameDates = result[0];
    var top10Dates = result[1];

    gameDates.forEach((d, i) => {
      d.top10Video = top10Dates[i];
      d.timestamp = datesToFetch[i].format('x');
    });

    return uploadDropbox(`/nba-data.json`, JSON.stringify({
      lastUpdate: Date.now(),
      gameDates: gameDates
    }));
  })
  .then(response => {
    console.log(response);
    process.exit(0);
  });

