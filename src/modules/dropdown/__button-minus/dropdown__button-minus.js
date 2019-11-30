import {counter} from '../__count/dropdown__count'

let dropdownButtonsMinus = document.querySelectorAll(".dropdown__button-minus");

for (let i = 0; i < dropdownButtonsMinus.length; i++) {
    dropdownButtonsMinus[i].addEventListener('click', (e) => {
        if (!counter.count <= 0)
            counter.setCount(e.currentTarget, 'minus');
        else
            e.currentTarget.classList.add('dropdown__button-minus_disabled');
    })
}