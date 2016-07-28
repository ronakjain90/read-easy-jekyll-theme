jQuery(document).ready(function($){
  var mainHeader = $('.site-header'),
  //this applies only if secondary nav is below intro section
    headerHeight = mainHeader.height();

  //set scrolling variables
  var scrolling = false,
    previousTop = 0,
    currentTop = 0,
    scrollDelta = 10,
    scrollOffset = 150;
  
  $(window).on('scroll', function(){
    if( !scrolling ) {
      scrolling = true;
      (!window.requestAnimationFrame)
        ? setTimeout(autoHideHeader, 250)
        : requestAnimationFrame(autoHideHeader);
    }
  });

  $(window).on('resize', function(){
    headerHeight = mainHeader.height();
  });

  function autoHideHeader() {
    var currentTop = $(window).scrollTop();
    checkStickyNavigation(currentTop);
    previousTop = currentTop;
    scrolling = false;
  }

  function checkStickyNavigation(currentTop) {
    //secondary nav below intro section - sticky secondary nav
    var secondaryNavOffsetTop = mainHeader.height();

    if (previousTop >= currentTop ) {
      //if scrolling up...
      if( currentTop < secondaryNavOffsetTop ) {
        //secondary nav is not fixed
        mainHeader.removeClass('is-hidden');
      } else if( previousTop - currentTop > scrollDelta ) {
        //secondary nav is fixed
        mainHeader.removeClass('is-hidden');
      }

    } else {
      //if scrolling down...
      if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
        //hide primary nav
        mainHeader.addClass('is-hidden');
      } else if( currentTop > secondaryNavOffsetTop ) {
        //once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset
        mainHeader.removeClass('is-hidden');
      }

    }
  }
});