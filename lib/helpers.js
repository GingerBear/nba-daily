var moment = require('moment');
require('moment-timezone');
var week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var cheerio = require('cheerio');

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

  try {
    json = JSON.parse(raw.replace(/(\\')/g, '\''));
  } catch(e) {}

  return json.results && json.results[0] || {};
}
