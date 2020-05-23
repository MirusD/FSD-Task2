import './checkbox-list.scss'

class CheckboxList {
    constructor(component) {
        this.component = component;
        this.checkboxListBtn = this.component.querySelector('.checkbox-list__btn');
        this.checkboxListItems = this.component.querySelector('.checkbox-list__items');
        this.init();
    };
    init() {
        this.checkboxListBtn.addEventListener('click', () => {
           this.checkboxListItems.classList.toggle('show');
           if (this.checkboxListBtn.getAttribute('aria-expanded') === 'false')
               this.checkboxListBtn.setAttribute('aria-expanded', 'true');
           else
               this.checkboxListBtn.setAttribute('aria-expanded', 'false');
        });
    };
}

document.querySelectorAll('.js-checkbox-list').forEach((node) => {
    new CheckboxList(node);
});