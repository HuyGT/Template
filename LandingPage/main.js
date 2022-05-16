function imgSlider(anything){
    document.querySelector('.pepsi').src = anything;
}

function changeBgColor(color){
    const sec = document.querySelector('.sec');
    sec.style.background = color;
}

function menuToggle(){
    const toggleMenu = document.querySelector('.toggleMenu');
    const navigation = document.querySelector('.navigation');

    toggleMenu.classList.toggle('active');
    navigation.classList.toggle('active');

}

$(document).ready(function(){
    $(window).scroll(function(){
      if($(this).scrollTop()){
          $('header').addClass('sticky');
      }
      else{
        $('header').removeClass('sticky');
      }
    });
  });