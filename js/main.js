// Smooth Scroll

$(document).ready(function(){
  $("a").on('click', function() {
    if (this.hash !== "") {
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });
});

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

console.log(dropTop);
$('.dropdown-block').css('top', dropTop + 'px');

var distance = $('.page-nav').offset().top,
    $window = $(window);

if ( $window.scrollTop() >= distance ) {
  $('.page-nav').addClass('attached');
} else {
  $('.page-nav').removeClass('attached');
}

$window.scroll(function() {
    if ( $window.scrollTop() >= distance ) {
      $('.page-nav').addClass('attached');
    } else {
      $('.page-nav').removeClass('attached');
    }
});
