$(document).on('DOMContentLoaded', function(){
    $('.sidenav').sidenav();
    $('.btn').on('click', function(e){
        e.preventDefault();
    });
    $('.dropdown-trigger').dropdown();
    $('.carousel.carousel-slider').carousel({
        indicators:true,
        fullWidth:true
    });
    setInterval(function(){
        $('.carousel').carousel('next');
    }, 10000);
});
