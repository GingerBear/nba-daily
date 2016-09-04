var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var _ = require('lodash');
var helpers = require('../lib/helpers');


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

    var videos = [];
    var dateGroup = {};

    for(var i = 0; i < results.length; i++) {
      videos = videos.concat(results[i]);
    }

    videos = _.chain(videos)
      .filter(helpers.whitelister(whitelist))
      .each(helpers.formatDate)
      .each(function(v) {
        if (dateGroup[v.date]) {
          dateGroup[v.date].push(v);
        } else {
          dateGroup[v.date] = [v];
        }
      }).value();

    if (req.isJson) {
      res.send(dateGroup);
    } else {
      res.render('videos', {
        nav: 'top-10',
        title: 'Top 10',
        videos: dateGroup
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
        return callback(error);
      }

      var data = helpers.parseJsCode(body);
      return callback(null, data);
    })
  }
}

module.exports = router;
