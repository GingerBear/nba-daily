var request = require('request');
var cheerio = require('cheerio');
var getVideoLink = require('./get-video-link');

module.exports = function (date) {
  if (!Array.isArray(date)) {
    date = [date];
  }

  return getTop10Links().then(links => {
    var fetchTargetLinks = date
      .map(d => {
        var link = links.filter(l => l.indexOf(d) > -1);
        return link.length ? link[0] : null;
      })
      .map(link => link ? getVideoLink(link) : Promise.resolve(''));

    return Promise.all(fetchTargetLinks);
  });
}

function getTop10Links() {
  var url = 'http://www.nba.com/video/top10';

  return new Promise((resolve, reject) => {
    return request(url, (err, response, body) => {
      if (err) return reject(err);

      var $ = cheerio.load(body);
      var videoLinks = $('#main_sidebar [data-video-id]')
        .map((i, data) => $(data).attr('data-video-id'))
        .get();

      return resolve(videoLinks);
    })
  });
}
