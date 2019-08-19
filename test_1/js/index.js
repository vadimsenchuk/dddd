'use strict';

$(document).ready(function() {
  $('.owl-carousel').owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000
  });
});

//popup
$('body').on('click', '.header__btn', () => {
  let parent = $(this).parent();

  $('.popup').fadeIn(500);
  $('.popup__box')
    .removeClass('transform-out')
    .addClass('transform-in');
  $('body').css({
    overflow: 'hidden'
  });
});

$('.popup').click(e => {
  if ($(e.target).hasClass('popup') || $(e.target).hasClass('popup__close')) {
    $('body').css({
      overflow: 'visible'
    });
    $('.popup').fadeOut(500);
    $('.popup__box')
      .removeClass('transform-in')
      .addClass('transform-out');
  }
});

form;
$('form').on('submit', () => {
  $('.popup').fadeOut(500);
  $('.popup__box')
    .removeClass('transform-in')
    .addClass('transform-out');
  $('body').css({
    overflow: 'visible'
  });
});
