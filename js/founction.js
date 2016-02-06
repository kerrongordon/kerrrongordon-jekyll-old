$(document).ready(function () {
  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });
});

var mainMenu = (function () {

  var body              = $('.body'),
      navToggle         = $('#nav-toggle'),
      mainPage          = $('.main-page'),
      shadowOver        = $('#shadowOver'),
      navigationMenuA   = $('#navigation-menu a');

    navToggle.on('click', menuToggle);
    mainPage.on('click', menuClose);
    navigationMenuA.on('click', menuToggle);

    function menuToggle() {
      body.toggleClass( 'menu-open' );
      navToggle.toggleClass( 'active' );
      shadowOver.toggleClass('fadeOver');
    }

    function menuClose() {
      if (body.hasClass('menu-open')) {
        body.removeClass( "menu-open" );
        navToggle.removeClass( "active" );
        shadowOver.delay(500)
        .queue( function(next){
            $(this).removeClass('fadeOver');
            next();
        });
      };
    }

})(jQuery);

var projects = (function(){

    var pFull   		= $('.projects__full'),
        pclose  		= $('.projects__close'),
				proje   		= $('#projects'),
        loadCon 		= $('#loadContent'),
        pItem   		= $('.projects__item'),
        pItems  		= $('.projects__items'),
        settings 		= {
            loading: 'loading.html'
        };

	loadCon.load(settings.loading);

    pItem.on('click', openprojectitem);
    pclose.on('click', closeprojectitem);

    function openprojectitem(e) {
        pFull.addClass('projects__items--left');
        pItems.hide(500);
        var pageId = $(this).attr('id');
        loadCon.load(pageId + '.html');

				$('html, body').animate({
          scrollTop: proje.offset().top
        }, 1000);
    }

    function closeprojectitem(e) {
        e.preventDefault();
        pFull.removeClass('projects__items--left');
        pItems.show();
        loadCon.delay(400)
        .queue( function(next){
            $(this).load(settings.loading);
            next();
        });
    }

})(jQuery);
