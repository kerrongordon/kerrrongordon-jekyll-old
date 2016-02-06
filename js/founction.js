'use strict';

$(document).ready(function () {

  pageScroll(800);
  mainMenu(); 
  projects(500);

});

var pageScroll = (function (speed) {

  var pageLink = $('.page-link');

  pageLink.on('click', goToSection);

  function goToSection(e) {
    var targ    = $(this).attr('href'),
        target  = targ.replace('/', '');
 
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, speed);
  }

});

var mainMenu = (function () {

  var body              = $('.body'),
      navToggle         = $('#nav-toggle'),
      mainPage          = $('.main-page'),
      navigationMenuA   = $('#navigation-menu a');

    navToggle.on('click', menuToggle);
    mainPage.on('click', menuClose);
    navigationMenuA.on('click', menuToggle);

    function menuToggle() {
      body.toggleClass( 'menu-open' );
      navToggle.toggleClass( 'active' );
    }

    function menuClose() {
      if (body.hasClass('menu-open')) {
        body.removeClass( "menu-open" );
        navToggle.removeClass( "active" );
      };
    }

});

var projects = (function(animat){

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
        pItems.hide(animat);
        var pageId = $(this).attr('id');
        loadCon.load(pageId + '.html');

				$('html, body').animate({
          scrollTop: proje.offset().top
        }, animat);
    }

    function closeprojectitem(e) {
        e.preventDefault();
        pFull.removeClass('projects__items--left');
        pItems.show();
        loadCon.delay(animat)
        .queue( function(next){
            $(this).load(settings.loading);
            next();
        });
    }

});
