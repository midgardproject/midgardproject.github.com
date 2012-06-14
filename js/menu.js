document.write('<script type="text/javascript" src="/js/nav/jquery.scrollTo.js"></script>');
document.write('<script type="text/javascript" src="/js/nav/jquery.nav.min.js"></script>');

jQuery(document).ready(function() {
  var navigationBar = jQuery('article aside');
  var initial = navigationBar.position();

  var scrollTop = function() {
    return document.body.scrollTop || document.documentElement.scrollTop;
  };

  var checkPosition = function() {
    if (!navigationBar.hasClass('fixedmenu') &&
      (navigationBar.offset().top - scrollTop() < 0)) {
      navigationBar.css('top', 0);
      navigationBar.css('float', 'none');
      navigationBar.css('right', '10%');
      navigationBar.css('position', 'fixed');
      navigationBar.addClass('fixedmenu');
    } else if (navigationBar.hasClass('fixedmenu') &&
      scrollTop() <= initial.top) {
      navigationBar.css('position', 'absolute');
      navigationBar.css('right', '10%');
      navigationBar.css('top', initial.top + 'px');
      navigationBar.removeClass('fixedmenu');
    }
  };

  jQuery('#nav').onePageNav({
    currentClass: 'active',
    changeHash: true
  });

  window.onscroll = checkPosition;

  if (window.location.hash) {
    checkPosition();
    jQuery(window).trigger('scroll.onePageNav');
  }
});
