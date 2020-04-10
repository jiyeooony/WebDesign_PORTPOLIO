//스크롤버튼 내리면 내용 나오기
$(document).ready(function(){
    var gnb=$('#gnb').outerHeight();
    var $scroll=$('.scroll');

    $scroll.on('click',function  () {
        var showCnt=$(this).attr('href');
        $(showCnt).css({'display':'block'});
        $('.back').css({'display':'block'},800);
        $('.top_go').css({'display':'block'},800);
        var $page_cover=$(showCnt).children('.real_show');
        var position=$page_cover.offset().top-gnb;
        console.log('보여지는것'+showCnt+'움직일 높이값'+position);

        $(window).off("scroll");
        $("html, body").stop().animate({scrollTop:position}, 1500, function  () {
            $(window).on("scroll");
    });

    //탑버튼
    $('.top_go').on('click', function () {
        $(window).off("scroll");
        $("html, body").stop().animate({scrollTop:position}, 800, function ( ) {
            $(window).on("scroll");
        });
        return false;
    });
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function(){
    
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
        } // End if
    });
});