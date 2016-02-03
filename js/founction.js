(function($){
	$(window).load(function(){

    	/* Page Scroll to id fn call */
	// 	$("#navigation-menu a,a[href='#top'],a[rel='m_PageScroll2id']").mPageScroll2id({
	// 	highlightSelector:"#navigation-menu a"
	// });

	/* demo functions */
	$("a[rel='next']").click(function(e){
		e.preventDefault();
		var to=$(this).parent().parent("section").next().attr("id");
		$.mPageScroll2id("scrollTo",to);
	});

	$(window).bind('scroll', function() {
         if ($(window).scrollTop() > $('.header-s').height() ) {
             //$('.site-header').addClass('menu-top animated fadeInDown');
         }
         else {
             //$('.site-header').removeClass('menu-top animated fadeInDown');
         }
    });

    $('#nav-toggle').click(function() {

        $('.body').toggleClass( "menu-open" );
        $('#nav-toggle').toggleClass( "active" );
    });

    $('#navigation-menu a').click(function() {
        $('.body').toggleClass( "menu-open" );
        $('#nav-toggle').removeClass( "active" );
    });

    $('.main-page').click(function() {
        $('.body').removeClass( "menu-open" );
        $('#nav-toggle').removeClass( "active" );
    });




});
})(jQuery);

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

})();
