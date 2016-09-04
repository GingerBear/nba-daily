(function() {

  var isMobile = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(window.navigator.userAgent);

  function showStandings(json) {
    var template = Handlebars.compile($('[data-template-name="standings"]').html());
    var html = template(json);
    $('.standings .content').html(html);
  }

  if (!isMobile) {
    $.ajax('/standings').done(showStandings);
  }

})();