---
layout: null
---

$(document).ready(function () {

  //mainMenu();
  projects(500);
  forms('{{site.data.config.email}}');

});



var mainMenu = (function () {



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
          notification('beforeSend');
    		},
    		success: function(data) {
          notification('success');
          formInput.val('');
    		},
    		error: function(err) {
          notification('error');
    		}
    	});
    }
});


var notification = (function (e) {
  var notification      = $('.notification'),
      $notify            = $('.notify');

  //notification.addClass('notification__show');

  notify();

  if (e === 'beforeSend') {
    $notify.append('<div class="notification"><p>Data is Prossing.</p></div>');
  } else if (e === 'success') {
    $notify.append('<div class="notification"><p>Message sent!.</p></div>');
  } else if (e === 'error') {
    $notify.append('<div class="notification"><p>Ops, there was an error.</p></div>');
  }


  if ($notify.length) {
    var i = $notify.find('.notification');

     $notify.delay(5000)
     .queue(function(next){
       i.first().remove();
       next();
     });
  }




  // notification.delay(5000)
  // .queue( function(next){
  //     $(this).removeClass('notification__show');
  //     $('.notification__notify').remove();
  //     next();
  // });

});

var notify = (function () {
  var notify = $('.notify');

  notify.toggleClass('notify--show');

});


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
