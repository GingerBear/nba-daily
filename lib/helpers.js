var moment = require('moment');
require('moment-timezone');
var week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var cheerio = require('cheerio');
var _ = require('lodash');

module.exports = {
  formatDate: formatDate,
  whitelister: whitelister,
  week: week,
  parseJsCode: parseJsCode
}

function formatDate(item) {
  var date = moment.unix(item.mediaDateUts);
  item.date = date.tz('America/New_York').format('dddd, MM/DD/YYYY');
}

function whitelister(whitelist) {
  return function(item) {
    //return true;
    for (var i = 0; i < whitelist.length; i++) {
      if (whitelist[i].test(item.title.toLowerCase())) {
        return true;
      }
    }
    return false;
  }
}

function parseJsCode(body) {
  var $ = cheerio.load(body);
  var raw = $('#jsCode').text();
  var json = {};
  var videos = [];

  try {
    json = JSON.parse(raw.replace(/(\\')/g, '\''));
  } catch(e) {}

  if (json.results && json.results[0]) {
    videos = json.results[0];
  } else {
    return {};
  }

  videos.forEach((item) => {
    item.image = parseImage(item);
  });

  return videos;
}

function parseImage(item) {
  if (_.get(item, 'metadata.media.600x336.uri')) {
    return _.get(item, 'metadata.media.600x336.uri')
  } else if (_.get(item, 'metadata.media.thumbnail.url')) {
    return _.get(item, 'metadata.media.thumbnail.url').replace(/w_\d+,h_\d+/, 'w_408,h_288')
  } else {
    return 'images/not-found.png'
  }
}