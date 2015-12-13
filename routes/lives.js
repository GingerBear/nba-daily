var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');


/* GET recent standing by conference. */
router.get('/', function(req, res, next) {
  async.waterfall([
    getPage(),
    parsePage()
  ], function(err, result) {
    res.render('lives', result);
  })
});

function getPage() {
  return function(callback) {
    request('http://www.ifirstrowus.eu/sport/basketball.html', function(error, response, body) {
      if (error) {
        throw error;
      }
      callback(null, body);
    })
  }
}


function parsePage() {
  return function(body, callback) {
    var $ = cheerio.load(body);
    var $games = $('#accordion h3');
    var games = [];

    $games.each(function(i, game) {
      var self = $(this);
      var $links = self.next('div');
      var links = [];

      $links.find('a[href]').each(function() {
        links.push({
          title: $(this).text().trim(),
          href: '/live' + $(this).attr('href')
        });
      });

      games.push({
        title: self.text().trim(),
        links: links
      });
    });

    callback(null, games);
  }
}

module.exports = router;
