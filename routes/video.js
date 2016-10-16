var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var URL = require('url');

var remote = 'http://www.nba.com';

/* GET users listing. */
router.get('*', function(req, res, next) {
  var path = URL.parse(req.originalUrl).path;

  async.waterfall([
    getPage(path),
    parsePage()
  ], function(err, result) {
    if (req.isJson) {
      res.send(result);
    } else {
      res.render('video', result)
    }
  })
});

function getPage(path) {
  return function(callback) {
    request(remote + path, function(error, response, body) {
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
    var $video = $('#main');
    var json = {
      video: $video.find('[itemprop="contentUrl"]').attr('content'),
      page: $video.find('[itemprop="embedUrl"]').attr('content'),
      title: $video.find('[itemprop="name"]').attr('content'),
      description: $video.find('[itemprop="description"]').attr('content'),
      thumbnailUrl: $video.find('[itemprop="thumbnailUrl"]').attr('content'),
      duration: $video.find('[itemprop="duration"]').attr('content')
    };

    callback(null, json);
  }
}

module.exports = router;
