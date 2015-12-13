// Custom handlebar helpers

module.exports = function(app) {

  var hbs = app.hbs;

  // css helper for getting paths to compiled assets
  hbs.registerHelper('css', function(file, options) {
    return css(file);
  });

  // js helper for getting paths to compiled assets
  hbs.registerHelper('js', function(file, options) {
    return js(file);
  });

};