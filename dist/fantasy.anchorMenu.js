(function ($) {

 $.fn.anchorMenu = function (options) {

    var settings = $.extend({
      level: 'a',
      padding: 100,
      speed: 'slow'

    }, options||{});

    if (window.location.pathname.length == 1 && localStorage.getItem('linkHash') != null) {

      if(localStorage.getItem('linkHash').indexOf('#') == 0) {
        var target1 = localStorage.getItem('linkHash');

        setTimeout(function () {
          $('html, body').animate({
            scrollTop : $(target1).offset().top - settings.padding
          }, settings.spped);
        }, 700);

        localStorage.clear();
      }

    }
    else {
      localStorage.clear();
    }

    return this.filter('ul').each(function () {

      $(this).on('click', settings.level, function () {

        var target = $(this).attr('href');

        function tag() {
          return window.location.pathname.length == 1 && target.indexOf('#') >= 0 ? true :
                 window.location.pathname.length > 1 && target.indexOf('#') >= 0 ? false :
                 '';
        }

        if (tag() == true) {

          $('html, body').animate({
            scrollTop : $(target).offset().top - settings.padding
          }, settings.speed)

          return false;
        }
        else {

          var linkHash = $(this).attr('href').indexOf('#') >= 0 ? $(this).attr('href') : '';

          localStorage.setItem('linkHash', linkHash);

          window.location = '/';
        }

       });

    });
 };

})(jQuery);