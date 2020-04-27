import './input.scss'

class InputRadio {
    constructor (component, components) {
        this.components = components;
        this.component = component;
        this._attachEventHandler();
    }
    _attachEventHandler() {
        this.component.addEventListener('change', () => {
            for (let i = 0; i < this.components.length; i++) {
                if (this.components[i].checked) {
                    this.components[i].parentElement.querySelector('.radio__element').classList.add('radio_checked')
                } else {
                    this.components[i].parentElement.querySelector('.radio__element').classList.remove('radio_checked')
                }
            }
        })
    }
}

document.querySelectorAll('.js-input__radio').forEach((node, i, arr)=> {
    new InputRadio(node, arr);
});

// import 'cleave.js'
import Cleave from 'cleave.js';
//
// let cleave = new Cleave('.text-field_masked', {
//     date: true,
//     delimiter: '.',
//     datePattern: ['d', 'm', 'Y']
// });
//
// // cleave();
//
// console.log(cleave);