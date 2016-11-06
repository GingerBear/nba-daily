var getJson = require('../lib/get-json');
var cheerio = require('cheerio');
var request = require('request');
var _ = require('lodash');

module.exports = function(gameId) {
  var url = `https://api.nba.net/0/league/video?games=${gameId}&accessToken=nbainternal%7C3830242580404678b2552bbdd03b73ee`;
  return getJson(url).then((json) => {

    var videoUrl;

    try {
      videoUrl = json.response.result.filter(isRecap)[0].url;
    } catch(e) {}

    if (!videoUrl) {
      return Promise.resolve({
        gameId: gameId,
        recapLink: ''
      });
    }

    return getVideoLink(videoUrl).then(link => Promise.resolve({
      gameId: gameId,
      recapLink: link
    }));
  });
}

function getVideoLink(videoUrl) {
  var url = `http://www.nba.com/${videoUrl}`;
  return new Promise((resolve, reject) => {
    return request(url, (err, response, body) => {
      if (err) return reject(err);

      var $ = cheerio.load(body);
      var videoLink = $('[itemprop="contentUrl"]').first().attr('content');

      return resolve(videoLink);
    })
  });
}

function isRecap(video) {
  return _.find(_(video).get('taxonomy.gameRelated'), { value: 'Recap' });
}