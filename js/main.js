// Fixed Head Padding Fix
var dropTop = $('.masthead').height();
$('main').css('padding-top', dropTop + 'px');

// Smooth Scroll

$(document).ready(function(){
  $("a").on('click', function() {
    if (this.hash !== "") {
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top - dropTop - 20.8
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
      // $('.tog-bottom').css('width', '100%');
      $('.tog-top').css('transform', 'translateY(-50%) rotate(-45deg)');
      $('.tog-bottom').css('transform', 'translateY(50%) rotate(45deg)');
      $('.nav').css('transform', 'none')
    }, 150);
  }

  $('.masthead').toggleClass('open');

});

// Mobile Nav Height and Top Positioning

function mediaQuery(maxM) {
  if (maxM.matches) { // If media query matches
    var navTop = $('.masthead').height();
    $('.masthead nav').css('top', navTop);
    $('.masthead nav').css('height', 'calc(100% - ' + navTop + 'px)');
    console.log(navTop);
  } else {
   $('.masthead').removeClass('small');
  }
}

var maxM = window.matchMedia("(max-width: 38em)")
mediaQuery(maxM) // Call listener function at run time
maxM.addListener(mediaQuery) // Attach listener function on state changes

// Filter

var filterBtn = document.getElementsByClassName('btn-filter');
var itemList = document.getElementById('item-list');
const filterList = ['all', 'armour', 'clothing', 'headwear', 'potion', 'ring', 'utility', 'weapon', 'apothecaries', 'artificers', 'bars', 'blacksmiths', 'bookstores', 'brothels', 'clothing-stores', 'food', 'general-stores', 'shipyards', 'stables', 'stalls', 'tattoo-parlours', 'aghara', 'council-of-the-bruins', 'pijavka', 'port-george-city-guard', 'port-george-stadium', 'unaligned'];
var filter = document.getElementById('filter');

if (filter) {
  filter.addEventListener("change", function() {
    var value = this.value;
    itemList.classList.remove(...filterList);
    itemList.classList.add(value);
  });
}

// Outdated filter

// var applyFilter = function() {
//     var filterApplied = this.getAttribute("data-filter");
//     itemList.classList.remove(...filterList);
//     itemList.classList.add(filterApplied);
//     Array.from(filterBtn).forEach(function(element) {
//       element.classList.remove('btn-selected');
//     });
//     this.classList.add('btn-selected');
// };
//
// Array.from(filterBtn).forEach(function(element) {
//    element.addEventListener('click', applyFilter);
// });



// Page Nav Generation

var pageNavList = document.getElementById('page-nav-list');

if (pageNavList) {
  var heading = document.querySelectorAll('h2, h3');
  heading.forEach(function(navItem) {
    let txt = document.createTextNode(navItem.innerText);
    let href = navItem.id;
    let li = document.createElement('li');
    let a = document.createElement('a')
    a.appendChild(txt);
    a.setAttribute('href', '#' + href);
    li.appendChild(a);
    if (navItem.tagName == 'H2') {
      li.classList.add('level-1', 'mega');
    } else if (navItem.tagName == 'H3') {
      li.classList.add('level-2');
    }
    pageNavList.appendChild(li);
  });
}

function minMediaQuery(minM) {
  if (minM.matches) { // If media query matches

    // Page Nav Snap

    var pageNav = document.getElementById('page-nav');
    var position = window.pageYOffset;
    var pageNavOffset = pageNav.offsetTop;
    var pageNavSnap = pageNavOffset - dropTop - 20.8;

    function addPageNavSnap() {
      pageNav.style.width = pageNav.offsetWidth + 'px';
      if (position >= pageNavSnap) {
        pageNav.classList.add('snapped');
        pageNav.style.top = (dropTop + 20.8) + 'px';
      } else if (position < pageNavSnap) {
        pageNav.classList.remove('snapped');
      }
    }

    addPageNavSnap();

    window.addEventListener("scroll", function () {
      var position = window.pageYOffset;

      if (position >= pageNavSnap) {
        pageNav.classList.add('snapped');
        pageNav.style.top = (dropTop + 20.8) + 'px';
      } else if (position < pageNavSnap) {
        pageNav.classList.remove('snapped');
      }

    });

    // Unnecessary Top offset check? Keeping for reference
    // var getElemDistance = function ( pageNav ) {
    //     var fromTop = 0;
    //     if (pageNav.offsetParent) {
    //         do {
    //             fromTop += pageNav.offsetTop;
    //             pageNav = pageNav.offsetParent;
    //         } while (pageNav);
    //     }
    //     return fromTop >= 0 ? fromTop : 0;
    // };
    //
    // var fromTop = getElemDistance( pageNav );
    //
    // console.log(fromTop);

  }
}

var minM = window.matchMedia("(min-width: 38em)")
minMediaQuery(minM) // Call listener function at run time
minM.addListener(mediaQuery) // Attach listener function on state changes


// Mobile Page Nav

var toggle = document.querySelector('.page-nav-toggle');
var links = document.querySelector('.page-nav-links');
var innerLink = document.querySelectorAll('.page-nav-links a');
var pageNav = document.getElementById('page-nav');

toggle.addEventListener('click', function(e) {
  e.preventDefault();
  if (pageNav.classList.contains('open')) {
    links.style.opacity = 0;
    pageNav.style.overflowY = 'hidden';
    setTimeout(function() {
      links.style.display = 'none';
      pageNav.classList.remove('open');
    }, 150);
  } else {
    pageNav.classList.add('open');
    links.style.display = 'block';
    setTimeout(function() {
      pageNav.style.overflowY = 'scroll';
      links.style.opacity = 1;
    }, 150);
  }
});

// console.log(innerLink);


var closePageNav = function () {
  links.style.opacity = 0;
  pageNav.style.overflowY = 'hidden';
  setTimeout(function() {
    links.style.display = 'none';
    pageNav.classList.remove('open');
  }, 150);
}

function mediaQuery(maxM) {
  if (maxM.matches) { // If media query matches
    var innerLink = document.querySelectorAll('.page-nav-links a');

    Array.from(innerLink).forEach(function(element) {
      console.log(element)
       element.addEventListener('click', closePageNav);
    });
  }
}

var maxM = window.matchMedia("(max-width: 38em)")
mediaQuery(maxM) // Call listener function at run time
maxM.addListener(mediaQuery) // Attach listener function on state changes

// // Mobile Page Nav
//
// var toggle = document.querySelector('.page-nav-toggle');
// var links = document.querySelector('.page-nav-links');
// var innerLink = document.querySelectorAll('.page-nav-links a');
// var pageNav = document.getElementById('page-nav');
//
// toggle.addEventListener('click', function(e) {
//   e.preventDefault();
//   if (pageNav.classList.contains('open')) {
//     links.style.opacity = 0;
//     pageNav.style.overflowY = 'hidden';
//     setTimeout(function() {
//       links.style.display = 'none';
//       pageNav.classList.remove('open');
//     }, 150);
//   } else {
//     pageNav.classList.add('open');
//     links.style.display = 'block';
//     setTimeout(function() {
//       pageNav.style.overflowY = 'scroll';
//       links.style.opacity = 1;
//     }, 150);
//   }
// });
//
// console.log(innerLink);
//
// var closePageNav = function () {
//   links.style.opacity = 0;
//   pageNav.style.overflowY = 'hidden';
//   setTimeout(function() {
//     links.style.display = 'none';
//     pageNav.classList.remove('open');
//   }, 150);
// }
//
// Array.from(innerLink).forEach(function(element) {
//   console.log(element)
//    element.addEventListener('click', closePageNav);
// });

// Tab Index Adding

var headings = document.querySelectorAll('h2, h3');

headings.forEach(function(e) {
  e.setAttribute('tabindex', '0');
});
