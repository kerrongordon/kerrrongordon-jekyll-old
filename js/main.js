$( document ).ready(function() {
    //$("body").fadeIn(2000);
    
     $('.load').load('protfolio/dis/protfolio.html');
    
    
    $('body').on('click','.more-infor', function() {
        $('.site-preview').addClass('show');
        $('.load').addClass('slide-out');
        return false;
    });
    
    $('body').on('click', '.close-btn',function() {
        $('.site-preview').removeClass('show');
        $('.load').removeClass('slide-out');
        return false;
    });
    
    $('body').on('click','.more-infor',function(event) {
        var pageInfor = $(this).attr('id');
            $('.site-preview').load('protfolio/full/' + pageInfor + '.html');
            return false;
    });
    
   
});
   
        
 

