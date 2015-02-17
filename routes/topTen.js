var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var _ = require('lodash');


/* GET recent top 10. */
router.get('/', function(req, res, next) {

  var whitelist = [
    /top\s+\d+/,
    /of\sthe\s(month|week|year)/
  ];

  async.parallel([
    getPageData(1, 50),
    getPageData(51, 100),
    getPageData(101, 150)
  ], function(err, results) {

    var ret = [];
    for(var i = 0; i < results.length; i++) {
      ret = ret.concat(results[i]);
    }

    ret = ret.filter(function(v) {
      //return true;
      for (var i = 0; i < whitelist.length; i++) {
        if (whitelist[i].test(v.title.toLowerCase())) {
          return true;
        }
      }
      return false;
    });

    res.send(ret);
  });
});

function getPageData(start, number) {
  start = start || 0;
  number = number || 44;
  return function(callback) {
    request('http://searchapp2.nba.com/nba-search/query.jsp?type=advvideo&start='+start+'&npp='+number+'&section=channels/top_plays&season=1415&sort=recent&site=nba&hide=true&csiID=csi2', function(error, response, body) {
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
