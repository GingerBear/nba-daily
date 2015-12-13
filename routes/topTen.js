var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var _ = require('lodash');
var utils = require('../lib/utils');


/* GET recent top 10. */
router.get('/', function(req, res, next) {

  var whitelist = [
    /top\s+\d+/,
    /of\sthe\s(month|week|year)/
  ];

  async.parallel([
    getPageData(1, 50),
    getPageData(51, 100)
  ], function(err, results) {

    var ret = [];
    for(var i = 0; i < results.length; i++) {
      ret = ret.concat(results[i]);
    }

    ret = _.chain(ret)
      .filter(utils.whitelister(whitelist))
      .each(utils.formatDate)
      .value();

    if (req.xhr) {
      res.send(ret);
    } else {
      res.render('videos', {
        nav: 'top-10',
        title: 'Top 10',
        videos: ret
      });
    }
  });
});

function getPageData(start, number) {
  start = start || 0;
  number = number || 44;
  return function(callback) {
    request('http://searchapp2.nba.com/nba-search/query.jsp?type=advvideo&start='+start+'&npp='+number+'&section=channels/top_plays&season=1516&sort=recent&site=nba&hide=true&csiID=csi2', function(error, response, body) {
      if (error) {
        throw error;
      }
      var $ = cheerio.load(body);
      var json = $('#jsCode').text();

      try {
        json = JSON.parse(json.replace(/(\\')/g, '\''));
      } catch(e) {}

      callback(null, json.results[0]);
    })
  }
}

module.exports = router;
