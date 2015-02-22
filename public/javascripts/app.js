(function() {
  $.ajax('/standings').done(showStandings);

  function showStandings(json) {
    var template = Handlebars.compile($('[data-template-name="standings"]').html());
    var html = template(json);
    $('.standings .content').html(html);
  }

  function initStandingToggler() {
    $('.standings h2').click(function() {
      $('.standings .content').toggleClass('show');
    });
  }

  if ($(window).width() <= 500) {
    initStandingToggler();
  }

  $(window).resize(function() {
    if ($(window).width() <= 500) {
      initStandingToggler();
    }
  });


})();