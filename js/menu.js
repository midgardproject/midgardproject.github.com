jQuery(document).ready(function() {
    var navigationBar = jQuery('article aside');
    var initial = navigationBar.position();

    window.onscroll = function() {
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
    
    function scrollTop() {
        return document.body.scrollTop || document.documentElement.scrollTop;
    }
});
