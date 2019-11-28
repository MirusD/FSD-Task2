let guestsRoom = document.querySelectorAll('.dropdown_list-for-choosing-the-number-of-guests');
let dropdownShowButton = document.querySelectorAll('.dropdown__show-button');
let dropdownExpandedBlock;

for (let i = 0; i < dropdownShowButton.length; i++) {
    dropdownExpandedBlock = dropdown[i].querySelector('.dropdown__expanded-block');
    console.log(dropdownExpandedBlock);

    dropdownShowButton[i].addEventListener("click",() => {
        dropdownShowButton[i].classList.toggle("dropdown__show-button_clicked");
        dropdownExpandedBlock[i].classList.toggle('dropdown__expanded-block_visible');
    });
};
