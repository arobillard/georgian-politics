// Fixed Head Padding Fix
var dropTop = document.querySelector('.masthead').offsetHeight;
var main = document.getElementById('main');

main.style.paddingTop = dropTop + 'px';

// Nav Open

var masthead = document.querySelector('.masthead');
var menuTog = document.querySelector('.menu-tog');
var togTop = document.querySelector('.tog-top');
var togMiddle = document.querySelector('.tog-middle');
var togBottom = document.querySelector('.tog-bottom');
var navWrap = document.querySelector('.nav-wrap');
var childOpener = document.querySelectorAll('.child-opener-level-one, .child-opener-level-two');
var backBtn = document.querySelectorAll('.back-button');

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

function addHighlighted(target) {
  target.classList.add('highlighted');
  target.previousElementSibling.classList.add('highlighted');
}

function removeHighlighted(target) {
  target.classList.remove('highlighted');
  target.previousElementSibling.classList.remove('highlighted');
}

document.querySelector('.skip-to-nav').addEventListener('click', function() {
  toggleChange();
  document.getElementById('nav').focus();
});

menuTog.addEventListener('click', function() {
  event.preventDefault();
  var subTwoOpen = document.querySelector('.subnav-level-two.sub-open');
  var subOneOpen = document.querySelector('.subnav-level-one.sub-open');
  var topLevelHighlight = document.querySelector('.child-opener-level-one.highlighted');
  var firstLevelHighlight = document.querySelector('.child-opener-level-two.highlighted');
  if (subTwoOpen) {
    closeChild(subTwoOpen);
    removeHighlighted(topLevelHighlight);
    removeHighlighted(firstLevelHighlight);
    setTimeout(function () {
      closeChild(subOneOpen);
    }, 150)
    setTimeout(function () {
      toggleChange();
    }, 300)
  } else if (subOneOpen && typeof subTwoOpen !== 'undefinded') {
    closeChild(subOneOpen);
    removeHighlighted(topLevelHighlight);
    setTimeout(function () {
      toggleChange();
    }, 150)
  } else {
    toggleChange();
  }
});

window.addEventListener('keydown', function(e) {
  if (e.keyCode == 27) {
    if (masthead.classList.contains('open')) {
      var subTwoOpen = document.querySelector('.subnav-level-two.sub-open');
      var subOneOpen = document.querySelector('.subnav-level-one.sub-open');
      var topLevelHighlight = document.querySelector('.child-opener-level-one.highlighted');
      var firstLevelHighlight = document.querySelector('.child-opener-level-two.highlighted');
      if (subTwoOpen) {
        closeChild(subTwoOpen);
        removeHighlighted(topLevelHighlight);
        removeHighlighted(firstLevelHighlight);
        setTimeout(function () {
          closeChild(subOneOpen);
        }, 150)
        setTimeout(function () {
          toggleChange();
        }, 300)
      } else if (subOneOpen && typeof subTwoOpen !== 'undefinded') {
        closeChild(subOneOpen);
        removeHighlighted(topLevelHighlight);
        setTimeout(function () {
          toggleChange();
        }, 150)
      } else {
        toggleChange();
      }
    }
  }
});

var mainCloser = document.getElementById('main');

mainCloser.addEventListener('click', function() {
  if (masthead.classList.contains('open')) {
    var subTwoOpen = document.querySelector('.subnav-level-two.sub-open');
    var subOneOpen = document.querySelector('.subnav-level-one.sub-open');
    var topLevelHighlight = document.querySelector('.child-opener-level-one.highlighted');
    var firstLevelHighlight = document.querySelector('.child-opener-level-two.highlighted');
    if (subTwoOpen) {
      closeChild(subTwoOpen);
      removeHighlighted(topLevelHighlight);
      removeHighlighted(firstLevelHighlight);
      setTimeout(function () {
        closeChild(subOneOpen);
      }, 150)
      setTimeout(function () {
        toggleChange();
      }, 300)
    } else if (subOneOpen && typeof subTwoOpen !== 'undefinded') {
      closeChild(subOneOpen);
      removeHighlighted(topLevelHighlight);
      setTimeout(function () {
        toggleChange();
      }, 150)
    } else {
      toggleChange();
    }
  }
});

Array.from(childOpener).forEach(function(element) {
   element.addEventListener('click', function(event) {
     // event.preventDefault();
     event.preventDefault();
     var ref = this.getAttribute('href').substr(1);
     var target = document.getElementById(ref);
     var subTwoOpen = document.querySelector('.subnav-level-two.sub-open');
     var subOneOpen = document.querySelector('.subnav-level-one.sub-open');
     var topLevelHighlight = document.querySelector('.child-opener-level-one.highlighted');
     var firstLevelHighlight = document.querySelector('.child-opener-level-two.highlighted');
     if (target.classList.contains('sub-open')) {
       if (subTwoOpen && !this.classList.contains('child-opener-level-two')) {
         closeChild(subTwoOpen);
         removeHighlighted(firstLevelHighlight);
         setTimeout(function () {
           removeHighlighted(topLevelHighlight);
           closeChild(subOneOpen);
         }, 150)
       } else {
         closeChild(target);
         removeHighlighted(firstLevelHighlight);
       }
     } else {
       if (this.classList.contains('child-opener-level-one')) {
         if (subTwoOpen) {
           closeChild(subTwoOpen);
           addHighlighted(this);
           removeHighlighted(topLevelHighlight);
           removeHighlighted(firstLevelHighlight);
           setTimeout(function () {
             closeChild(subOneOpen);
           }, 150)
           setTimeout(function () {
             openChild(target);
           }, 300)
         } else if (subOneOpen && typeof subTwoOpen !== 'undefinded') {
           closeChild(subOneOpen);
           addHighlighted(this);
           removeHighlighted(topLevelHighlight);
           setTimeout(function () {
             openChild(target);
           }, 250)
         } else {
           openChild(target);
           addHighlighted(this);
         }
       } else {
         if (subTwoOpen) {
           closeChild(subTwoOpen);
           addHighlighted(this);
           removeHighlighted(firstLevelHighlight);
           setTimeout(function () {
             openChild(target);
           }, 150)
         } else {
           openChild(target);
           addHighlighted(this);
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
const filterList = ['all', 'armour', 'clothing', 'headwear', 'potion', 'ring', 'utility', 'weapon', 'apothecaries', 'artificers', 'bars', 'blacksmiths', 'bookstores', 'brothels', 'clothing-stores', 'food', 'general-stores', 'shipyards', 'stables', 'stalls', 'tattoo-parlours', 'aghara', 'council-of-the-bruins', 'pijavka', 'port-george-city-guard', 'port-george-stadium', 'unaligned', 'academia-del-umbra-arcana'];
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

(function() {
	scrollTo();
})();

function scrollTo() {
	const links = document.querySelectorAll('.scroll a');
	links.forEach(each => (each.onclick = scrollAnchors));
}

function scrollAnchors(e, respond = null) {
	const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
	e.preventDefault();
	var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
	const targetAnchor = document.querySelector(targetID);
	if (!targetAnchor) return;
	const originalTop = distanceToTop(targetAnchor);
	window.scrollBy({ top: originalTop - dropTop - 20.8, left: 0, behavior: 'smooth' });
	const checkIfDone = setInterval(function() {
		const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
		if (distanceToTop(targetAnchor) === 0 || atBottom) {
			targetAnchor.tabIndex = '-1';
			targetAnchor.focus();
			window.history.pushState('', '', targetID);
			clearInterval(checkIfDone);
		}
	}, 100);
}
