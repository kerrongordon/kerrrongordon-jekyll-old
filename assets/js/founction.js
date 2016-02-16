---
layout: null
---

$(document).ready(function () {

  pageScroll(800);
  mainMenu();
  projects(500);
  forms('{{site.email}}');

});

var pageScroll = (function (speed) {

  var pageLink = $('.menu__list__item');

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

  var $menu             = $('.menu'),
      $body             = $('.main-page'),
      $menuToggle       = $('.menu__toggle'),
      $pageLink         = $('.menu__list__item');

    $menuToggle.on('click', menuToggle);
    $pageLink.on('click', menuToggle);
    $body.on('click', menuClose);

    function menuToggle() {
      $menu.toggleClass( 'menu--open' );
    }

    function menuClose() {
      if ($menu.hasClass('menu--open')) {
        $menu.removeClass( "menu--open" );
      }
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
            loading: '{{ site.baseurl }}/assets/loading.html'
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


var forms = (function (email) {
  var form         = $('#contact__form'),
      formInput    = $('.contact__form__input');

    form.submit(submitEmail);

    function submitEmail(e) {
      e.preventDefault();
      $.ajax({
    		url: '//formspree.io/' + email,
    		method: 'POST',
    		data: $(this).serialize(),
    		dataType: 'json',
    		beforeSend: function() {
          formInput.val('');
    		},
    		success: function(data) {
          notification('ms');
    		},
    		error: function(err) {
          notification('e');
    		}
    	});
    }
});


var notification = (function (e) {
  var notification      = $('.notification');

  notification.addClass('notification__show');

  if (e === 'ms') {
    notification.append('<p class="notification__notify notification__notify--success">Message sent!</p>');
  } else if (e === 'e') {
    notification.append('<p class="notification__notify notification__notify--error">Ops, there was an error.</p>');
  }

  notification.delay(5000)
  .queue( function(next){
      $(this).removeClass('notification__show');
      $('.notification__notify').remove();
      next();
  });

});
