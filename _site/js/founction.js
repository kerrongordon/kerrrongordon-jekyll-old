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

    $('.elements-box .content').on('click', function(){
    	$('.box').css({display: "block"});
    	$('.elements-box').css({display: "none"});

   
    		var pageId = $(this).attr('id');
    		$('.page-load').load('page/' + pageId + '.html')
   
    });

    $('.close').on('click', function(e){
    	e.preventDefault();
    	$('.box').css({display: "none"});
    	$('.elements-box').css({display: "block"});
    });


});
})(jQuery);


