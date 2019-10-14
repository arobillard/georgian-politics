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

var masthead = document.querySelector('.masthead');
var menuTog = document.querySelector('.menu-tog');
var togTop = document.querySelector('.tog-top');
var togMiddle = document.querySelector('.tog-middle');
var togBottom = document.querySelector('.tog-bottom');
var navWrap = document.querySelector('.nav-wrap');
var levelOneOpener = document.querySelectorAll('.child-opener-level-one');
var levelTwoOpener = document.querySelectorAll('.child-opener-level-two');
var backBtnLevelOne = document.querySelectorAll('.back-sub-level-one');
var backBtnLevelTwo = document.querySelectorAll('.back-sub-level-two');

function toggleChange() {
  if (masthead.classList.contains('open')) {
    togTop.style.transform = 'translateY(-50%)';
    togBottom.style.transform = 'translateY(50%)';

    setTimeout(function() {
      togTop.removeAttribute('style');
      togMiddle.removeAttribute('style');
      togBottom.removeAttribute('style');


    }, 150);
    masthead.classList.remove('open');
  } else {
    togTop.style.top = '50%';
    togTop.style.transform = 'translateY(-50%)';
    togBottom.style.bottom = '50%';
    togBottom.style.transform = 'translateY(50%)';

    setTimeout(function() {
      togMiddle.style.display = 'none';
      togTop.style.transform = 'translateY(-50%) rotate(-45deg)';
      togBottom.style.transform = 'translateY(50%) rotate(45deg)';
    }, 150);

    masthead.classList.add('open');
  }
}

navWrap.style.height = 'calc(100vh - ' + dropTop + 'px)';
navWrap.style.top = dropTop + 'px';

var openLevelOne = function() {
  event.preventDefault();
  var target = this.getAttribute('href').substr(1);
  var openedSub = document.getElementById(target);

  openedSub.classList.add('sub-opened');
  setTimeout(function() {
    navWrap.classList.add('sub-one-open');
  }, 1);
}

var openLevelTwo = function(clicked, timeShift) {
  var target = clicked.getAttribute('href').substr(1);
  var openedSub = document.getElementById(target);

  openedSub.classList.add('sub-opened');
  if (timeShift == true) {
    setTimeout(function() {
      navWrap.classList.remove('sub-one-open');
      navWrap.classList.add('sub-two-open');
    }, 250);
  } else {
    setTimeout(function() {
      navWrap.classList.remove('sub-one-open');
      navWrap.classList.add('sub-two-open');
    }, 1);
  }
}

var closeLevelOne = function() {
  var target = document.querySelector('.subnav-level-one.sub-opened');
  navWrap.classList.remove('sub-one-open');
  setTimeout(function() {
    target.classList.remove('sub-opened');
  }, 250);
}

var closeLevelTwo = function() {
  var target = document.querySelector('.subnav-level-two.sub-opened');
  navWrap.classList.add('sub-one-open');
  navWrap.classList.remove('sub-two-open');
  setTimeout(function() {
    target.classList.remove('sub-opened');
  }, 250);
}

Array.from(levelOneOpener).forEach(function(element) {
   element.addEventListener('click', openLevelOne);
});

Array.from(levelTwoOpener).forEach(function(element) {
   element.addEventListener('click', function() {
     event.preventDefault();
     var clicked = this;
     var levelTwoOpened = document.querySelector('.subnav-level-two.sub-opened');

     if (levelTwoOpened) {
       console.log('closing');
       closeLevelTwo()
       setTimeout(function() {
         openLevelTwo(clicked, true);
       }, 1);
     } else {
       openLevelTwo(clicked, false);
       console.log('not closing');
     }
   });
});

Array.from(backBtnLevelOne).forEach(function(element) {
   element.addEventListener('click', function() {
     event.preventDefault();
     closeLevelOne();
   });
});

Array.from(backBtnLevelTwo).forEach(function(element) {
   element.addEventListener('click', function() {
     event.preventDefault();
     closeLevelTwo();
   });
});


menuTog.addEventListener('click', function() {
  event.preventDefault();
  if (navWrap.classList.contains('sub-one-open')) {
    closeLevelOne();
    setTimeout(function() {
      toggleChange();
    }, 150);
  } else if (navWrap.classList.contains('sub-two-open')) {
    closeLevelTwo();
    setTimeout(function() {
      closeLevelOne();
    }, 150);
    setTimeout(function() {
      toggleChange();
    }, 300);
  } else {
    toggleChange();
  }
});


// Mobile Nav Height and Top Positioning

function mediaQuery(maxM) {
  if (maxM.matches) { // If media query matches
    var navTop = $('.masthead').height();
    $('.masthead nav').css('top', navTop);
    $('.masthead nav').css('height', 'calc(100% - ' + navTop + 'px)');
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

if (toggle) {
  toggle.addEventListener('click', function() {
    event.preventDefault();
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
}

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
       element.addEventListener('click', closePageNav);
    });

  }
}

var maxM = window.matchMedia("(max-width: 38em)")
mediaQuery(maxM) // Call listener function at run time
maxM.addListener(mediaQuery) // Attach listener function on state changes

// Tab Index Adding

var headings = document.querySelectorAll('h2, h3');

headings.forEach(function(e) {
  e.setAttribute('tabindex', '0');
});
