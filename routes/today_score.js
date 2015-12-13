var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var utils = require('../lib/utils');

/* GET today score. */
router.get('/', function(req, res, next) {

  async.parallel([
    getScore(0),
    getScore(1),
    getScore(2)
  ], function(err, result) {
    if (req.xhr) {
      res.send(result);
    } else {
      res.render('score', {
        nav: 'score',
        title: 'Today Score',
        scores: result
      });
    }
  })
});

function getScore(last) {
  //get the today date to update the request url
  var datetime = new Date();
  datetime.setDate(datetime.getDate() - last);
  var month = datetime.getMonth() + 1;
  var day  = datetime.getDate();
  var year = datetime.getFullYear();
  var week = utils.week[datetime.getDay()];

  month = (month < 10 ? '0' : '') + month;
  day = (day < 10 ? '0' : '') + day;

  return function(callback) {
    request('http://www.nba.com/gameline/' + year + month + day + '/', function(error, response, body) {
      if (error) {
        throw error;
      }

      var $ = cheerio.load(body);
      var $games = $('.GameLine');

      var games = $games.map(function() {
        var $game = $(this);
        var $teams = $game.find('.nbaModTopInfo').find('.nbaModTopTeamAw, .nbaModTopTeamHm');

        var teams = $teams.map(function() {
          var $team = $(this);
          return {
            team: $team.find('.nbaModTopTeamName').text().toUpperCase(),
            score: $team.find('.nbaModTopTeamNum').text(),
            win: !!$team.find('.win').length,
            logo: $team.find('img').attr('src')
          }
        }).get();

        return {
          status: $game.find('.nbaModTopStatus .nbaFnlStatTx').text(),
          startTime: $game.find('.nbaModTopStatus .nbaFnlStatTxSm').text(),
          teams: teams
        }
      }).get();

      callback(null, {
        date:  week + ', ' + month + '/' + day + '/' + year,
        games: games
      });
    })
  }
}

module.exports = router;
