import './radio.scss'

class Radio {
    constructor (component) {
        this.component = component;
        this._attachEventHandler();
    }
    _attachEventHandler() {
        this.component.addEventListener('click', () => {
            this.component.querySelector('.radio__element').classList.toggle('radio_checked');
        })
    }
}

document.querySelectorAll('.js-radio').forEach((node) => {
    new Radio(node);
});