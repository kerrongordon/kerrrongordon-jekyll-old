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



    $('.page-load').load('page/load.html');

    $('.elements-box .content').on('click', function(){

        $('.elements-box').addClass('animated fadeOutLeft')
          .delay(300)
          .queue( function(next){
            $(this).removeClass('animated fadeOutLeft').hide();
            next();
          });

          $('.box').addClass('animated zoomIn')
          .delay(300)
          .queue( function(next){
            $(this).removeClass('animated zoomIn').show();
            next();
          });

   			/* load in page by there id */
    		var pageId = $(this).attr('id');
    		$('.page-load').load('page/' + pageId + '.html');

    		/* Page Scroll to id tools */
			$.mPageScroll2id("scrollTo","tools");

    });

    // $('.close').on('click', function(e){
    // 	e.preventDefault();
    //
    //     $('.elements-box').show().addClass('animated fadeInLeft')
    //       .delay(300)
    //       .queue( function(next){
    //         $(this).removeClass('animated fadeInLeft');
    //         next();
    //       });
    //
    //       $('.box').addClass('animated fadeOutRight').hide()
    //       .delay(300)
    //       .queue( function(next){
    //         $(this).removeClass('animated fadeOutRight');
    //         next();
    //       });
    //
    //
    // 		//$('.page-load').load('page/load.html');
    //
    //     $('.page-load')
    //       .delay(300)
    //       .queue( function(next){
    //         $(this).load('page/load.html');
    //         next();
    //       });
    // });


});
})(jQuery);


var projects = (function(){
    var pFull   = $('.projects__full'),
        pclose  = $('.close'),
        loadCon = $('#loadContent'),
        pItem   = $('.projects__item'),
        pItems  = $('.projects__items');

	loadCon.load('page/load.html');

    pItem.on('click', openprojectitem);
    pclose.on('click', closeprojectitem);

    function openprojectitem(e) {
        pFull.css({'transform': 'translateX(-50%)'});

        pItems.delay(300)
        .queue( function(next){
          $(this).css({'height': '0'});
          next();
        });

        var pageId = $(this).attr('id');
        loadCon.load('page/' + pageId + '.html');
    }

    function closeprojectitem(e) {
        e.preventDefault();
        pFull.css({'transform': 'translateX(0%)'});

        pItems.delay(300)
        .queue( function(next){
          $(this).css({'height': 'auto'});
          next();
        });

        loadCon.delay(300)
        .queue( function(next){
            $(this).load('page/load.html');
            next();
        });
    }

})();
