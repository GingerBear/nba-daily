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
    $('[data-preload="true"]').each(function(i) {
      var videoLink = $(this);
      if (i <= 5) {
        initVideo(videoLink);
      }
    });
  }

  function initVideo($link) {
    var img = $link.find('img');
    var href = $link.attr('href');
    $.get(href).done(function(data) {
      if (data.video) {
        $link.replaceWith('<video class="video-player" controls poster="' + data.thumbnailUrl + '" src="' + data.video + '"></video>');
      }
    });
  }

})();