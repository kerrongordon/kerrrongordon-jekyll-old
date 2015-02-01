(function($){
	$(window).load(function(){
			
    	/* Page Scroll to id fn call */
		$("#navigation-menu a,a[href='#top'],a[rel='m_PageScroll2id']").mPageScroll2id({
		highlightSelector:"#navigation-menu a"
	});
				
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

        $('.box').css({left: "0%"});
        $('.elements-box').css({left: "-130%"});

        $('.tools-infor')
          .delay(800)
          .queue( function(next){ 
            $(this).css('height','0'); 
            next(); 
          });

   			/* load in page by there id */
    		var pageId = $(this).attr('id');
    		$('.page-load').load('page/' + pageId + '.html')

    		/* Page Scroll to id tools */
			$.mPageScroll2id("scrollTo","tools");
   
    });

    $('.close').on('click', function(e){
    	e.preventDefault();

        $('.box').css({left: "130%"});
        $('.elements-box').css({left: "0%"});
        $('.tools-infor').css({height: "auto"});

    		$('.page-load').load('page/load.html');
    });


});
})(jQuery);


