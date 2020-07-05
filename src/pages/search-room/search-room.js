import './search-room.scss'

let filter = document.querySelector('.filter');
let screenBlack = document.querySelector('.filter__screen-black');
let btnOpenFilter = document.querySelector('.search-room__btn-open-filter');
let btnClosed = document.querySelector('.filter__btn-closed');
let doc = document.querySelector('body');

if (btnOpenFilter) {
    btnOpenFilter.addEventListener('click', () => {
        filter.classList.add('opened');
        screenBlack.classList.add('active');
        doc.style.overflow="hidden";
    });
}

if (btnClosed) {
    btnClosed.addEventListener('click', () => {
        filter.classList.remove('opened');
        screenBlack.classList.remove('active');
        doc.style.overflow="auto";
    });
}