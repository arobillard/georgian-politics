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
var childOpener = document.querySelectorAll('.child-opener-level-one, .child-opener-level-two');
var backBtn = document.querySelectorAll('.back-button');
// var levelTwoOpener = document.querySelectorAll('.child-opener-level-two');
var backBtnLevelOne = document.querySelectorAll('.back-sub-level-one');
var backBtnLevelTwo = document.querySelectorAll('.back-sub-level-two');

navWrap.style.height = 'calc(100vh - ' + dropTop + 'px)';
navWrap.style.top = dropTop + 'px';

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

function openChild(target) {
  target.style.display = 'block';
  setTimeout(function () {
    target.classList.add('sub-open');
  }, 150)
}

function closeChild(target) {
  target.classList.remove('sub-open');
  setTimeout(function () {
    target.removeAttribute('style');
  }, 250)
}

menuTog.addEventListener('click', function() {
  event.preventDefault();
  var subTwoOpen = document.querySelector('.subnav-level-two.sub-open');
  var subOneOpen = document.querySelector('.subnav-level-one.sub-open');
  if (subTwoOpen) {
    console.log('Sub 2 open')
    closeChild(subTwoOpen);
    setTimeout(function () {
      closeChild(subOneOpen);
    }, 150)
    setTimeout(function () {
      toggleChange();
    }, 300)
  } else if (subOneOpen && typeof subTwoOpen !== 'undefinded') {
    console.log('Sub 1 open only')
    closeChild(subOneOpen);
    setTimeout(function () {
      toggleChange();
    }, 150)
  } else {
    toggleChange();
  }
});

Array.from(childOpener).forEach(function(element) {
   element.addEventListener('click', function() {
     event.preventDefault();
     var ref = this.getAttribute('href').substr(1);
     var target = document.getElementById(ref);
     var subTwoOpen = document.querySelector('.subnav-level-two.sub-open');
     var subOneOpen = document.querySelector('.subnav-level-one.sub-open');
     if (target.classList.contains('sub-open')) {
       if (subTwoOpen) {
         console.log('Sub 2 open')
         closeChild(subTwoOpen);
         setTimeout(function () {
           closeChild(subOneOpen);
         }, 150)
       } else {
         closeChild(target);
       }
     } else {
       console.log('nothing open, running next checks')
       if (this.classList.contains('child-opener-level-one')) {
         console.log('level 1 clicked');
         if (subTwoOpen) {
           console.log('Sub 2 open')
           closeChild(subTwoOpen);
           setTimeout(function () {
             closeChild(subOneOpen);
           }, 150)
           setTimeout(function () {
             openChild(target);
           }, 300)
         } else if (subOneOpen && typeof subTwoOpen !== 'undefinded') {
           console.log('Sub 1 open only')
           closeChild(subOneOpen);
           setTimeout(function () {
             openChild(target);
           }, 250)
         } else {
           openChild(target);
         }
       } else {
         console.log('level 2 clicked');
         if (subTwoOpen) {
           console.log('Sub 2 open')
           closeChild(subTwoOpen);
           setTimeout(function () {
             openChild(target);
           }, 150)
         } else {
           openChild(target);
         }
       }
     }
   });
});

Array.from(backBtn).forEach(function(element) {
   element.addEventListener('click', function() {
     event.preventDefault();
     var target = this.parentElement;
     var subTwoOpen = document.querySelector('.subnav-level-two.sub-open');
     var subOneOpen = document.querySelector('.subnav-level-one.sub-open');
     if (subTwoOpen) {
       console.log('Sub 2 open')
       closeChild(subTwoOpen);
       setTimeout(function () {
         closeChild(target);
       }, 150)
     } else {
       closeChild(target);
     }
   });
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

    if (document.getElementById('page-nav')) {
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
