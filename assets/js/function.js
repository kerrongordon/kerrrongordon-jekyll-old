---
layout: null
---

$(document).ready(function () {

  mainMenu();
  projects(500);
  forms('{{site.data.config.email}}');

});



var mainMenu = (function () {

      var aChildren = $(".menu__list").children();
      var aArray = [];
      for (var i=0; i < aChildren.length; i++) {
          var aChild = aChildren[i];
          var ahref = $(aChild).attr('href');
          aArray.push(ahref);
      }

      $(window).scroll(function(){
          var windowPos = $(window).scrollTop();
          var windowHeight = $(window).height();
          var docHeight = $(document).height();

          for (var i=0; i < aArray.length; i++) {
              var theID = aArray[i];
              var divPos = $(theID).offset().top/1.05;
              var divHeight = $(theID).height();
              if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                  $("a[href='" + theID + "']").addClass("menu__list__item--active");
              } else {
                  $("a[href='" + theID + "']").removeClass("menu__list__item--active");
              }
          }

          if(windowPos + windowHeight == docHeight) {
              if (!$("nav li:last-child a").hasClass("menu__list__item--active")) {
                  var navActiveCurrent = $(".menu__list__item--active").attr("href");
                  $("a[href='" + navActiveCurrent + "']").removeClass("menu__list__item--active");
                  $("nav li:last-child a").addClass("menu__list__item--active");
              }
          }
      });

});

var projects = (function(animat){

    var pFull   		= $('.projects__full'),
        pclose  		= $('.projects__close'),
        proje   		= $('#projects'),
        loadCon 		= $('#loadContent'),
        pItem   		= $('.projects__item'),
        pItems  		= $('.projects__items'),
        viewmode    = $('.viewmode'),
        settings 		= {
            loading: '{{ site.baseurl }}/assets/loading.html'
        };

	loadCon.load(settings.loading);

    pItem.on('click', openprojectitem);
    pclose.on('click', closeprojectitem);

    function openprojectitem(e) {
        pFull.addClass('projects__items--left');
        viewmode.addClass('viewmode_on');
        /**pItems.hide(animat); **/
        var pageId = $(this).attr('id');
        loadCon.load(pageId + '/index.html');
        document.location.hash = pageId;
    }

    function closeprojectitem(e) {
        e.preventDefault();
        pFull.removeClass('projects__items--left');
        viewmode.removeClass('viewmode_on');
        pItems.show();
        loadCon.delay(animat)
        .queue( function(next){
            $(this).load(settings.loading);
            next();
        });

        location.href = '#projects';
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
    		success: function(data) {
          formInput.val('');
          notification('success');
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

  notify();

  if (e === 'success') {
    $notify.append('<div class="notification pass"><p>Message sent!.</p></div>');
  }

  if (e === 'error') {
    $notify.append('<div class="notification error"><p>Ops, there was an error.</p></div>');
  }

  if ($notify.length) {
      var i = $notify.find('.notification');

       $notify.delay(5000)
       .queue(function(next){
         i.remove();
         next();
       });
    }

});

var notify = (function () {
  var notify = $('.notify');

  notify.toggleClass('notify--show');

});

function goTo(e) {
  window.location.hash = "#"+e[0].id;
}


$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        setTimeout(goTo(target), 1050);
        return false;
      }
    }
  });
});
