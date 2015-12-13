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
    initScrollPreload();
  }

  function initVideo($link) {
    var img = $link.find('img');
    var href = $link.attr('href');
    $link.addClass('preloading');
    $.get(href).done(function(data) {
      if (data.video) {
        $link.replaceWith('<video class="video-player" controls poster="' + data.thumbnailUrl + '" src="' + data.video + '"></video>');
      }
    });
  }

  function getVideosByScroll(y) {
    return $('li.video').filter(function() {
      return $(this).offset().top > y
    }).slice(0, 5);
  }

  function initScrollPreload() {
    var timer;
    tryPreload();

    function tryPreload() {
      var videos = getVideosByScroll(window.scrollY);
      videos.each(function() {
        var videoLink = $(this).find('[data-preload="true"]:not(.preloading)');
        initVideo(videoLink);
      });
    }

    window.onscroll = function() {
      clearTimeout(timer);
      timer = setTimeout(tryPreload, 200);
    };
  }

})();