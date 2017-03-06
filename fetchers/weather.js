var request = require('request');
var cheerio = require('cheerio');

module.exports = function getVideoLink() {
  var url = `http://www.accuweather.com/zh/us/squirrel-hill-pa/15217/daily-weather-forecast/2098598?day=2`;

  return new Promise((resolve, reject) => {
    return request(url, (err, response, body) => {
      if (err) return reject(err);

      var $ = cheerio.load(body);
      var dates = $('#panel-main #feed-tabs li').map(function () {
        var $item = $(this);
        return {
          weekday: $item.find('h3').text(),
          date: $item.find('h4').text(),
          high: f2c($item.find('.large-temp').text()),
          low: f2c($item.find('.small-temp').text()),
          icon: $item.find('.icon').attr('class'),
          desc: $item.find('.cond').text()
        }
      }).get();

      return resolve(dates);
    })
  });
}

function f2c(f) {
  var n = toNumber(f);
  if (isNumeric(n)) {
    return Math.round((5 / 9) * (n - 32));
  } else {
    return f;
  }
}

function toNumber(s) {
  return +(s.match(/\d+/) || []).pop();
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}