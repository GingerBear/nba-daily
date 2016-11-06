var getJson = require('../lib/get-json');
var getVideoLink = require('./get-video-link');
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

function isRecap(video) {
  return _.find(_(video).get('taxonomy.gameRelated'), { value: 'Recap' });
}