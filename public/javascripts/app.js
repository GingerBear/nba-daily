(function() {
  $.ajax('/standings').done(showStandings);

  function showStandings(json) {
    var template = Handlebars.compile($('[data-template-name="standings"]').html());
    var html = template(json);
    $('.standings .content').html(html);
  }


  $('.standings h2').click(function() {
    if ($(window).width() <= 500) {
      $('.standings .content').toggleClass('show');
    }
  });

})();