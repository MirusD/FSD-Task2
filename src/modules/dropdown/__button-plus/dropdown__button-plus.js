import {counter} from '../__count/dropdown__count'

let dropdownButtonsPlus = document.querySelectorAll(".dropdown__button-plus");

for (let i = 0; i < dropdownButtonsPlus.length; i++) {
    dropdownButtonsPlus[i].addEventListener('click', (e) => {
        counter.setCount(e.currentTarget, 'plus');
    })
}
// let dropdownButtonsMinus = document.querySelectorAll('.dropdown__button-minus');
// let dropdownCounts = document.querySelectorAll(".dropdown__count");

// function handlerCountingUnitButtons () {
//     let counter = [];
//
//     for (let i = 0; i < dropdownButtonsPlus.length; i++) {
//         counter[i] = +dropdownCounts[i].innerHTML;
//
//         if (counter[i] <= '0')
//             dropdownButtonsMinus[i].classList.add('dropdown__button-minus_disabled');
//
//         dropdownButtonsPlus[i].addEventListener('click', () => {
//             dropdownCounts[i].innerHTML = counter[i] = counter[i] + 1;
//             dropdownButtonsMinus[i].classList.remove('dropdown__button-minus_disabled');
//         });
//
//         dropdownButtonsMinus[i].addEventListener('click', () => {
//             if (counter[i] > '0')
//                 dropdownCounts[i].innerHTML = counter[i] = counter[i] - 1;
//             if (counter[i] <= '0')
//                 dropdownButtonsMinus[i].classList.add('dropdown__button-minus_disabled');
//         });
//     }
// }
//
// handlerCountingUnitButtons();
