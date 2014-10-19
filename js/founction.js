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
             $('.site-header').addClass('menu-top animated fadeInDown');
         }
         else {
             $('.site-header').removeClass('menu-top animated fadeInDown');
         }
    });

    $('.page-load').load('page/load.html');

    $('.elements-box .content').on('click', function(){
    	$('.box').css({display: "block"});
    	$('.elements-box').css({display: "none"});

   			/* load in page by there id */
    		var pageId = $(this).attr('id');
    		$('.page-load').load('page/' + pageId + '.html')

    		/* Page Scroll to id tools */
			$.mPageScroll2id("scrollTo","tools");
   
    });

    $('.close').on('click', function(e){
    	e.preventDefault();
    	$('.box').css({display: "none"});
    	$('.elements-box').css({display: "block"});

    		$('.page-load').load('page/load.html');
    });


});
})(jQuery);


