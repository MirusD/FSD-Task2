import 'ion-rangeslider'
import '../../../node_modules/ion-rangeslider/css/ion.rangeSlider.min.css'
import './range-slider.scss'

class RangeSlider {
    constructor (component) {
        this.component = component;
        this.rangeSliderInput = this.component.querySelector('.range-slider__input');
        this.rangeSliderRangeField = this.component.querySelector('.range-slider__value-field');
        this.init();
    };
    init () {
        $(this.rangeSliderInput).ionRangeSlider({
            type: "double",
            min: 0,
            max: 100,
            from: 10,
            to: 50,
            grid: false,
            hide_min_max: true,
            hide_from_to: true,
            onStart: () => {
                this.printValue();
            },
            onChange: ()=> {
                this.printValue();
            }
        });
    };
    printValue () {
        let formatter = new Intl.NumberFormat('ru', {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0
        });
        let $rangeSlider = $(this.rangeSliderInput);
        let fromValue = formatter.format($rangeSlider.data("from")).replace(/\s(?=\p{Sc})/gu, '');
        let toValue = formatter.format($rangeSlider.data("to")).replace(/\s(?=\p{Sc})/gu, '');

        this.rangeSliderRangeField.innerHTML = `${fromValue} - ${toValue}`;
    };
}

$('.js-range-slider').each((index, node) => {
   new RangeSlider(node);
});
