import './text-field.scss'
// import 'cleave.js'
import Cleave from 'cleave.js';

let cleave = new Cleave('.text-field_masked', {
    date: true,
    delimiter: '.',
    datePattern: ['d', 'm', 'Y']
});

// cleave();

console.log(cleave);