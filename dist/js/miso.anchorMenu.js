;(function ($) {

 $.fn.anchorMenu = function (options) {

    var settings = $.extend({
      level: 'a', // уровень вложенности для ссылки
      padding: 100, // отступ от начала документа
      speed: 'slow', // скорость прокрутки
      localstr: false, // запись в localStorage
      save_hash: false // сохранить якорь в адресной строке
    }, options||{});


    /** [animatePage функция запуска анимации] */
    function animatePage(target) {
      $('html, body').animate({
        scrollTop : $(target).offset().top - settings.padding
      }, settings.spped);
    }

    /**
     * [if проверка на главную страницу и значение в св-ве localStorage.
     * Если условие истинно, то срабатывает анимация прокуртки до якоря.]
     * @param  {[type]} window.location.pathname.length [description]
     */
    if (window.location.pathname.length == 1 && localStorage.getItem('linkHash') != null) {

      if (localStorage.getItem('linkHash').indexOf('#') == 0) {
        var target1 = localStorage.getItem('linkHash');

        setTimeout(function () {
          animatePage(target1);
        }, 700);

        localStorage.clear();
      }

    }
    else {
      localStorage.clear();
    }

    return this.filter('ul').each(function () {

      $(this).on('click', settings.level, function () {

        if (settings.save_hash)
          window.location.hash = '';

        var target = $(this).attr('href');

        if (settings.save_hash) {

          setTimeout(function() {
           window.location.hash = target;
          }, 0);

        }

        /**
         * [initialPage определение главной страницы]
         * @return {[boolean]} [если  св-во "строка пути" объекта location равна 1 и ссылка содержит #, то возвращает истину]
         */
        function initialPage() {
          return window.location.pathname.length == 1 && target.indexOf('#') >= 0 ? true :
                 window.location.pathname.length > 1 && target.indexOf('#') >= 0 ? false :
                 '';
        }

        /**
         * [if страница главная и запись в localStorage включена, то запускается анимация прокрутки до якоря]
         * @return {[boolean]} [отмена действия по умолчанию для ссылки]
         */
        if (initialPage() === true && settings.localstr === true) {

          animatePage(target);

          return false;
        }
        /**
         * [else иначе если страница не главная и запись в localStorage включена, то в св-во localStorage локального объекта Storage сохраняются данные текущего якоря.]
         */
        else if (initialPage() === false && settings.localstr === true) {

          var linkHash = $(this).attr('href').indexOf('#') >= 0 ? $(this).attr('href') : '';

          localStorage.setItem('linkHash', linkHash);

          window.location = '/';
        }
        /**
         * [if для любой страницы если запись в localStorage отключена]
         */
        else if (window.location.pathname.length >= 1 && settings.localstr === false) {

          animatePage(target);

          return false;
        }

       });

    });
 };

})(jQuery);