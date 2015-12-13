var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var URL = require('url');


/* GET recent standing by conference. */
router.get('*', function(req, res, next) {
  var path = URL.parse(req.originalUrl).path.replace(/^\/live/, '');

  async.waterfall([
    getPage(path),
    parsePage()
  ], function(err, result) {
    res.render('live', result);
  })
});


function getPage(path) {
  return function(callback) {
    request('http://www.ifirstrowus.eu' + path, function(error, response, body) {
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
    var title = $('title').text();

    console.log($('script[src*="04stream"]').toString());
    callback(null, {
      title: title,
      script: $('script[src*="04stream"]').toString().replace('width=600','width=1200').replace('height=450','height=1000')
    });
  }
}

module.exports = router;
