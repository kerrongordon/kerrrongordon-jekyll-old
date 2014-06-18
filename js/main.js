$( document ).ready(function() {
    //$("body").fadeIn(2000);
    
    $('.more-infor').click(function() {
        $('.site-preview').addClass('show');
        return false;
    });
    
    $('.close-btn').click(function() {
        $('.site-preview').removeClass('show');
        return false;
    });
});
   
        
 

