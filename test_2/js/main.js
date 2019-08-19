'use strict';

//popup
function popup() {
  document.querySelectorAll('.card .btn').forEach(button => {
    button.addEventListener('click', ({ target }) => {
      const title = target.parentElement.querySelector('.title').textContent;
      const price = target.parentElement.querySelector('.price').textContent;
      const imageSrc = target.parentElement.querySelector('img').src;
      const popupPrice = document.querySelector('.popup__price');
      let quant = +document.querySelector('select[name=number]').value;
      let totalPrice = (+price.slice(1) * quant).toFixed(2);

      $('.popup').fadeIn(500);
      $('.popup__box')
        .removeClass('transform-out')
        .addClass('transform-in');
      $('body').css({
        overflow: 'hidden'
      });

      document.querySelector('.popup__image img').src = imageSrc;
      document.querySelector('.popup__title').textContent = title;
      popupPrice.innerHTML = `$${
        String(totalPrice).split('.')[0]
      }<sup><small>.${String(totalPrice).split('.')[1]}</small></sup>`;
      document
        .querySelector('select[name=number]')
        .addEventListener('change', ({ target }) => {
          quant = +target.value;
          totalPrice = (+price.slice(1) * quant).toFixed(2);
          popupPrice.innerHTML = `$${
            String(totalPrice).split('.')[0]
          }<sup><small>.${String(totalPrice).split('.')[1]}</small></sup>`;
        });
    });
  });

  $('.popup').click(e => {
    if (
      $(e.target).hasClass('popup') ||
      $(e.target).hasClass('popup__close') ||
      $(e.target).hasClass('popup__btn')
    ) {
      $('body').css({
        overflow: 'visible'
      });
      $('.popup').fadeOut(500);
      $('.popup__box')
        .removeClass('transform-in')
        .addClass('transform-out');
    }
  });
}
//

//template
const $phone = document.querySelector('#phone');
const $notebook = document.querySelector('#notebook');
const $watch = document.querySelector('#watch');
const $accessory = document.querySelector('#accessory');
const $other = document.querySelector('#other');
let newArr = [];

fetch('./store/storage.json')
  .then(res => res.json())
  .then(data => {
    filterProducts(data.products);
    getTemplate(data.products);
  });

function getTemplate(arr) {
  fetch('./template/list.html')
    .then(res => res.text())
    .then(tpl => {
      const template = _.template(tpl);
      const card = arr.reduce((a, b) => a + template(b), '');
      document.querySelector('section .row').innerHTML = card;
      popup();
    });
}

function filterProducts(arr) {
  document.querySelectorAll('input[type="checkbox"').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        arr.forEach(item => {
          if (item.data === checkbox.name) {
            newArr.push(item);
          }
        });
      } else {
        newArr = newArr.filter(el => el.data !== checkbox.name);
      }
      if (newArr.length > 0) {
        getTemplate(newArr);
      } else {
        getTemplate(arr);
      }
    });
  });
}
