$('.temp-tog').on('click', function(e) {
  e.preventDefault();
  $(this).parent().toggleClass('open');
  if ($(this).text() == 'Open Menu') {
    $(this).text('Close Menu');
  } else {
    $(this).text('Open Menu');
  }
});

// Dropdown Positioning

var dropTop = $('.masthead').height();

$('.dropdown-block').css('top', dropTop + 'px');
$('main').css('padding-top', dropTop + 'px');

// Snap Scrolling Nav

if ($('.page-nav').length) {
  var distance = $('.page-nav').offset().top - dropTop,
      $window = $(window);

  if ( $window.scrollTop() >= distance ) {
    $('.page-nav').addClass('attached');
    $('.page-nav').css('top', dropTop + 'px');
  } else {
    $('.page-nav').removeClass('attached');
    $('.page-nav').css('top', 0);
  }

  $window.scroll(function() {
      if ( $window.scrollTop() >= distance ) {
        $('.page-nav').addClass('attached');
        $('.page-nav').css('top', dropTop + 'px');
      } else {
        $('.page-nav').removeClass('attached');
        $('.page-nav').css('top', 0);
      }
  });

}

// Smooth Scroll

$(document).ready(function(){
  $("a").on('click', function() {
    if (this.hash !== "") {
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top - dropTop
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });
});
