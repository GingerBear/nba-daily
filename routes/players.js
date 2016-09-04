var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var _ = require('lodash');
var helpers = require('../lib/helpers');
var playersList = require('../lib/players');


router.get('/', function(req, res, next) {
  if (req.isJson) {
    return res.send(playersList);
  }

  res.render('player-list', {
    nav: 'players',
    title: 'All players',
    players: playersList
  });
});

router.get('/:playerName', function(req, res, next) {
  var playerName = req.params.playerName;

  async.parallel([
    getPageData(1, 50, playerName),
    getPageData(51, 100, playerName)
  ], function(err, results) {
    if (err) {
      return next(err);
    }

    var videos = [];
    var dateGroup = {};

    for(var i = 0; i < results.length; i++) {
      videos = videos.concat(results[i]);
    }

    videos = _.chain(videos)
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
        nav: 'players',
        title: 'Player: ' + playerName,
        playerName: playerName,
        videos: dateGroup
      });
    }
  });
});

function getPageData(start, number, playerName) {
  start = start || 0;
  number = number || 44;

  return function(callback) {
    var url = `http://searchapp2.nba.com/nba-search/query.jsp?type=advvideo&start=${start}&npp=${number}&section=channels/*|games/*|flip_video_diaries|fiba&text=${encodeURIComponent(playerName)}&sort=recent&site=nba&hide=true&csiID=csi2`;
    request(url, function(error, response, body) {
      if (error) {
        return callback(error);
      }

      var data = helpers.parseJsCode(body);
      return callback(null, data);
    })
  }
}

module.exports = router;
