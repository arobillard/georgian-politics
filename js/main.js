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

// Nav Open

$('.menu-tog').on('click', function(stop) {
  stop.preventDefault();
  if ($('.masthead').hasClass('open')) {
    console.log('open');
    $('.tog-top').css('transform', 'translateY(-50%)');
    $('.tog-bottom').css('transform', 'translateY(50%)');
    $('.nav').css('transform', 'translateX(-100%)')

    setTimeout(function() {
      $('.tog-middle').css('display', 'inline');
      $('.tog-bottom').css('width', '66.6666%');
      $('.tog-top').css('top', '0');
      $('.tog-top').css('transform', 'none');
      $('.tog-bottom').css('bottom', '0');
      $('.tog-bottom').css('transform', 'none');
    }, 150);
  } else {
    console.log('closed');
    $('.tog-top').css('top', '50%');
    $('.tog-top').css('transform', 'translateY(-50%)');
    $('.tog-bottom').css('bottom', '50%');
    $('.tog-bottom').css('transform', 'translateY(50%)');

    setTimeout(function() {
      $('.tog-middle').css('display', 'none');
      $('.tog-bottom').css('width', '100%');
      $('.tog-top').css('transform', 'translateY(-50%) rotate(-45deg)');
      $('.tog-bottom').css('transform', 'translateY(50%) rotate(45deg)');
      $('.nav').css('transform', 'none')
    }, 150);
  }
  // setTimeout(function() {
  //   $('.request-fade-in').css('display', 'none');
  // }, 250);

  $('.masthead').toggleClass('open');

});

function mediaQuery(x) {
  if (x.matches) { // If media query matches
    var navTop = $('.masthead').height();
    $('.masthead .nav').css('top', navTop);
    $('.masthead .nav').css('height', 'calc(100% - ' + navTop + 'px)');
    console.log(navTop);
  } else {
   $('.masthead').removeClass('small');
  }
}

var x = window.matchMedia("(max-width: 38em)")
mediaQuery(x) // Call listener function at run time
x.addListener(mediaQuery) // Attach listener function on state changes
