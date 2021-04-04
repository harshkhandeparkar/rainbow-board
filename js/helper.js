$(document).ready(function(){
    let downloadButtons = 'none'
    $('.sidenav').sidenav();
    $('.materialboxed').materialbox();
    $('.scrollspy').scrollSpy();
    $('.btn').click(function(e){
        e.preventDefault();
    });
    $('#main-dwnld-btn').on('click', () => {
        downloadButtons === 'none' ? downloadButtons = 'block' : downloadButtons = 'none' ;
        $('#download-btns').css('display', downloadButtons);
    });
});