import './room-details.scss'

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