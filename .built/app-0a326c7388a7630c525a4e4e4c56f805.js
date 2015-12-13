(function() {

  var isMobile = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(window.navigator.userAgent);

  $.ajax('/standings').done(showStandings);

  function showStandings(json) {
    var template = Handlebars.compile($('[data-template-name="standings"]').html());
    var html = template(json);
    $('.standings').html(html);
  }


  $('.standing-toggle').click(function() {
    if ($(window).width() <= 500) {
      $('.standings').toggleClass('show');
    }
  });

  if (isMobile) {
    $('[data-preload="true"]').each(function() {
      var videoLink = $(this);
      var img = videoLink.find('img');
      var href = videoLink.attr('href');
      $.get(href).done(function(data) {
        img.replaceWith('<video class="video-player" poster="' + data.thumbnailUrl + '" src="' + data.video + '"></video>');
      });
    });
  }

})();