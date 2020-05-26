import './checkbox.scss'

class Checkbox {
    constructor (component) {
        this.component = component;
        this._attachEventHandler();
    }
    _attachEventHandler() {
        this.component.addEventListener('click', () => {
            this.component.querySelector('.checkbox__element').classList.toggle('checkbox_checked');
        })
    }
}

document.querySelectorAll('.js-checkbox').forEach((node) => {
    new Checkbox(node);
});