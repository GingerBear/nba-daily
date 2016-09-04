var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var _ = require('lodash');
var helpers = require('../lib/helpers');


/* GET recent single game highlight. */
router.get('/', function(req, res, next) {

  var whitelist = [
    /vs\./i
  ];

  async.parallel([
    getPageData(1, 50),
    getPageData(51, 100),
    getPageData(101, 150),
    getPageData(151, 200),
    getPageData(201, 250)
  ], function(err, results) {
    if (err) {
      return next(err);
    }

    var videos = [];
    var dateGroup = {};

    for(var i = 0; i < results.length; i++) {
      videos = videos.concat(results[i]);
    }

    _.chain(videos)
      .filter(helpers.whitelister(whitelist))
      .each(helpers.formatDate)
      .each(function(v) {
        if (dateGroup[v.date]) {
          dateGroup[v.date].push(v);
        } else {
          dateGroup[v.date] = [v];
        }
      }).value();

    if (req.xhr) {
      res.send(dateGroup);
    } else {
      res.render('videos-by-date', {
        nav: 'highlights',
        title: 'Game Highlights',
        videos: dateGroup
      });
    }
  });
});

function getPageData(start, number) {
  start = start || 0;
  number = number || 44;
  return function(callback) {
    request('http://searchapp2.nba.com/nba-search/query.jsp?type=advvideo&start='+start+'&npp='+number+'&event=playoffs&season=1516&sort=recent&site=nba&hide=true&csiID=csi5', function(error, response, body) {
      if (error) {
        return callback(error);
      }

      var data = helpers.parseJsCode(body);
      return callback(null, data);
    });
  }
}

module.exports = router;
