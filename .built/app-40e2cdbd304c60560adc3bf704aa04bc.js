(function() {

  var isMobile = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(window.navigator.userAgent);

  $.ajax('/standings').done(showStandings);

  function showStandings(json) {
    var template = Handlebars.compile($('[data-template-name="standings"]').html());
    var html = template(json);
    $('.standings .content').html(html);
  }


  if (isMobile) {
    $('.standing-toggle').click(function(e) {
      e.preventDefault();
      $('.standings .content').toggleClass('show');
    });
  }

  if (isMobile) {
    $('[data-preload="true"]').each(function() {
      var videoLink = $(this);
      var img = videoLink.find('img');
      var href = videoLink.attr('href');
      $.get(href).done(function(data) {
        if (data.video) {
          videoLink.replaceWith('<video class="video-player" controls poster="' + data.thumbnailUrl + '" src="' + data.video + '"></video>');
        }
      });
    });
  }

})();