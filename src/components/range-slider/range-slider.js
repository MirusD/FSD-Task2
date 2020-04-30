const noUiSlider = require('nouislider');
import '../../../node_modules/nouislider/distribute/nouislider.min.css'
import './range-slider.scss'

class RangeSlider {
    constructor (component) {
        this.component = component;
        this.init();
    }
    init () {
        noUiSlider.create(this.component, {
            start: [5000, 10000],
            step: 100,
            behaviour: 'drag',
            connect: true,
            range: {
                'min': 0,
                'max': 14900
        }
});

    }
}

$('.range-slider__linear').each((index, node) => {
   new RangeSlider(node);
});

// var rangeSlider = document.querySelector('.range-slider__linear');
// var nodes = [
//     document.querySelector('.range-slider__from'),
//     document.querySelector('.range-slider__to')
// ];
//
// noUiSlider.create(rangeSlider, {
//     start: [5000, 10000],
//     step: 100,
//     behaviour: 'drag',
//     connect: true,
//     range: {
//         'min': 0,
//         'max': 14900
//     }
// });
//
// rangeSlider.noUiSlider.on('update', function (values, handle) {
//     nodes[handle].innerHTML = Math.trunc(values[handle]) + '₽';
// });
