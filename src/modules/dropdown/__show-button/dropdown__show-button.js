import {setsTheClassToADropdownExpandedBlock} from '../__expanded-block/dropdown__expanded-block'
import {setsTheClassToADropdownBlock} from '../__block/dropdown__block'

let dropdownShowButton = document.querySelectorAll('.dropdown__show-button');

for (let i = 0; i < dropdownShowButton.length; i++) {
    dropdownShowButton[i].addEventListener('click', (e) => {
        e.currentTarget.classList.toggle("dropdown__show-button_clicked");
        setsTheClassToADropdownExpandedBlock(e.currentTarget);
        setsTheClassToADropdownBlock(e.currentTarget);
    });

}