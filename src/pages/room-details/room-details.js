import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import './room-details.scss'

let grid = document.querySelector('.swiper-wrapper');
let mySwiper;
const breakpoint = window.matchMedia('(min-width: 800px)');
const breakpointChecker = function() {
  if ( breakpoint.matches === true ) {
      if ( mySwiper !== undefined ) mySwiper.destroy(true, true);
      if (!grid.classList.contains('grid')) {
          grid.classList.add('grid');
      }
      return;
  }
  else if ( breakpoint.matches === false ) {
      if (grid.classList.contains('grid')) {
            grid.classList.remove('grid');
        }
      return enableSwiper();
  }
};

const enableSwiper = function() {
    mySwiper = new Swiper('.room-details__prev', {
        direction: 'horizontal',
        loop: true,
        spaceBetween: 10,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });
};

if (grid) {
    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
}

let btnOpenReservationInfo = document.querySelector('.room-details__btn-open-reservation-information');
let btnCloseReservationInfo = document.querySelector('.room-details__btn-close-reservation-information');
let roomDetailsRightBlock = document.querySelector('.room-details__right-block');

if (btnOpenReservationInfo) {
    btnOpenReservationInfo.addEventListener('click', () => {
        roomDetailsRightBlock.classList.add('open');
    })
}

if (btnCloseReservationInfo) {
    btnCloseReservationInfo.addEventListener('click', () => {
        roomDetailsRightBlock.classList.remove('open');
    })
}

