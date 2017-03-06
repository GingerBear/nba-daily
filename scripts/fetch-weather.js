var http = require('http');
var uploadDropbox = require('../lib/update-dropbox');
var fetchWeather = require('../fetchers/weather');

http.globalAgent.maxSockets = Infinity;

fetchWeather()
  .then(data => {
    return uploadDropbox(`/weather.json`, JSON.stringify({
      lastUpdate: Date.now(),
      data: data
    }));
  })
  .then(response => {
    console.log(response);
    process.exit(0);
  });;
