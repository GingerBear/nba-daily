var phantom = require('phantom');
var chai = require('chai');
var server = require('../bin/www');
var should = chai.should();

describe('nba-daily', function() {
  var page;
  var phantomInstance;

  before(function(done) {

    phantom.create(function (ph) {
      phantomInstance = ph;
      ph.createPage(function (p) {
        page = p;
        done();
      });
    });
  });

  describe('Game Highlights', function() {
    it('title should be Game Highlights', function(done) {
      this.timeout(15000);

      page.open("http://localhost:3000", function (status) {
        page.evaluate(function () {
          return document.querySelector('h1').innerText;
        }, function(result) {
          result.should.equal('Game Highlights');
          done();
        });
      });
    });

    it('should show videos', function(done) {
      this.timeout(15000);

      page.open("http://localhost:3000", function (status) {
        page.evaluate(function () {
          return document.querySelectorAll('.video').length;
        }, function(result) {
          result.should.above(1);
          done();
        });
      });
    });

    it('should show 30 teams\' standings', function(done) {
      this.timeout(15000);

      setTimeout(function() {
        page.evaluate(function () {
          return document.querySelectorAll('.standings .team').length;
        }, function(result) {
          result.should.to.equal(30);
          done();
        });
      }, 2000);
    });
  });

  after(function(){
    phantomInstance.exit();
    server.close();
  })
});