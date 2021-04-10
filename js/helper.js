$(document).on('DOMContentLoaded', function(){
    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown();
    $('.carousel.carousel-slider').carousel({
        indicators: false,
        fullWidth: true
    });
    setInterval(function(){
        $('.carousel').carousel('next');
    }, 6000);
});
