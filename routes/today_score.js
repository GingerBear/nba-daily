var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');


/* GET today score. */
router.get('/', function(req, res, next) {
  async.waterfall([
    getPage(),
    parsePage()
  ], function(err, result) {
    if (req.xhr) {
      res.send(result);
    } else {
      res.render('score', {
        title: 'Today Score',
        scores: result
      });
    }
  })
});

function getPage() {
  return function(callback) {
    request('http://www.nba.com/gameline/20150224/', function(error, response, body) {
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
    var $games = $('.Recap');

    var games = $games.map(function() {
      var $game = $(this);
      var $teams = $game.find('.nbaModTopTeamAw, .nbaModTopTeamHm');

      var teams = $teams.map(function() {
        var $team = $(this);
        return {
          team: $team.find('.nbaModTopTeamName').text(),
          score: $team.find('.nbaModTopTeamNum').text(),
          win: $team.find('.winner').text() ? true : false,
          logo: $team.find('img').attr('src')
        }
      }).get();

      return {
        status: $game.find('.nbaModTopStatus .nbaFnlStatTx').text(),
        startTime: $game.find('.nbaModTopStatus .nbaFnlStatTxSm').text(),
        teams: teams
      }
    }).get();

    callback(null, games);
  }
}

module.exports = router;
