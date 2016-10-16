var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var _ = require('lodash');
var helpers = require('../lib/helpers');
var teamsMap = require('../lib/teams');
var config = require('../lib/config');


router.get('/', function(req, res, next) {
  if (req.isJson) {
    res.send(teamsMap);
  } else {
    res.render('team-list', {
      nav: 'teams',
      title: 'All Teams',
      teams: teamsMap
    });
  }
});

router.get('/:teamKey', function(req, res, next) {

  var teamKey = req.params.teamKey;
  var teamName = _.find(teamsMap, { key: teamKey });

  if (!teamName) {
    return res.status(404).send(`Team ${teamKey} doesn't exist`);
  }

  async.parallel([
    getPageData(1, 50, teamName),
    getPageData(51, 100, teamName)
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
        nav: 'teams',
        title: 'Team: ' + teamName.name,
        team: teamName,
        videos: dateGroup
      });
    }
  });
});

function getPageData(start, number, teamName) {
  start = start || 0;
  number = number || 44;

  return function(callback) {
    var url = `http://searchapp2.nba.com/nba-search/query.jsp?type=advvideo&start=${start}&npp=${number}&section=games/*|channels/*&team=${encodeURIComponent(teamName.name)}&season=${config.season}&sort=recent&site=nba,${teamName.name}&hide=true&csiID=csi20`;
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