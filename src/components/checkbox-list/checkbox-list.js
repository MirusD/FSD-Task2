import './checkbox-list.scss'

function checkboxListInit () {
    const checkboxList = document.querySelectorAll('.checkbox-list');
    checkboxList.forEach((item) => {
        const checkboxListBtn = item.querySelector('.checkbox-list__btn');
        const checkboxListItems = item.querySelector('.checkbox-list__items');

        checkboxListBtn.addEventListener('click', () => {
           checkboxListItems.classList.toggle('show');
           console.log(checkboxListBtn.getAttribute('aria-expanded'));
           if (checkboxListBtn.getAttribute('aria-expanded') === 'false')
               checkboxListBtn.setAttribute('aria-expanded', 'true');
           else
               checkboxListBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

checkboxListInit();