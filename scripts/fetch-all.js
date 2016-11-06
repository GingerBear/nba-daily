var http = require('http');
var helpers = require('../lib/helpers');
var uploadDropbox = require('../lib/update-dropbox');
var fetchGameWithVideoByDate = require('../fetchers/get-games-with-recap-by-date.js');
var getTop10ByDates = require('../fetchers/get-top10-by-dates.js');
// var fs = require('fs');

// var Dropbox = require('dropbox');
// var dbx = new Dropbox({ accessToken: 'Zxv33fuUTboAAAAAAAAFeeUNAicuJ3F-_STjNzu6XogHXFcJySyZqO1kuLyH7duT' });

http.globalAgent.maxSockets = Infinity;


// dbx.filesUpload({path: '/teststring.json', contents: 'aslkdfjlsdkjflskdjf'})
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.error(error);
//   });

// dbx.sharingGetSharedLinks()
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

var today = helpers.datetime(new Date());
var yesterday = helpers.datetime(new Date()).subtract(1, 'days');
var tomorrow = helpers.datetime(new Date()).add(1, 'days');

var datesToFetch = [
  yesterday.format('YYYYMMDD'),
  today.format('YYYYMMDD'),
  tomorrow.format('YYYYMMDD')
];

var datesGamesToFetch = Promise.all(datesToFetch.map(d => fetchGameWithVideoByDate(d)));
var datesTop10ToFetch = getTop10ByDates(datesToFetch);

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
      d.date = datesToFetch[i];
    });

    return uploadDropbox(`/data_${today.format('YYYYMMDD')}.json`, JSON.stringify(gameDates));
  })
  .then(response => {
    console.log(response);
    process.exit(0);
  });

