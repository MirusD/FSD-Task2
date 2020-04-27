import './toggle.scss';
// import $ from 'jquery';

class Toggle {
    constructor (component) {
        this.component = component;
        this._attachEventHandler();
    }
    _attachEventHandler() {
        this.component.addEventListener('click', () => {
            this.component.querySelector('.toggle__element').classList.toggle('toggle_checked');
        })
    }
}

document.querySelectorAll('.js-toggle').forEach((node) => {
    new Toggle(node);
});