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
    if (req.isJson) {
      res.send(result);
    } else {
      result.nav = 'nav-standings';
      res.render('standings', result);
    }
  });
});

function getPage() {
  return function(callback) {
    request('http://www.nba.com/standings/team_record_comparison/conferenceNew_Std_Cnf.html', function(error, response, body) {
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
    var $teams = $('.mainStandings .odd, .even');
    var standing = {
      eastern: [],
      western: []
    };

    $teams.each(function(i, team) {
      var data = {
        team: $(this).find('.team a').text(),
        win: $(this).find('td').eq(1).text(),
        lose: $(this).find('td').eq(2).text()
      };

      if (i <= 14) {
        standing.eastern.push(data);
      } else {
        standing.western.push(data);
      }
    });

    callback(null, standing);
  }
}

module.exports = router;
