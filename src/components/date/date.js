import '../../../node_modules/air-datepicker/dist/css/datepicker.min.css'
import 'air-datepicker'
import '../../../node_modules/floss-js/dist/FLOSS.min'
import './date.scss'

class DateDropdown {
    constructor(component) {
        this.component = component;
        this.elDropdownDateDatepicker = this.component.querySelector('.dropdown-date__datepicker');
        this.startDateFrom = this.elDropdownDateDatepicker.getAttribute('data-date-from');
        this.startDateTo = this.elDropdownDateDatepicker.getAttribute('data-date-to');
        this.datepickerInst = $(this.elDropdownDateDatepicker).datepicker().data('datepicker');
        this.init();
    };
    init() {
        $(this.elDropdownDateDatepicker).datepicker.language['ru'] = {
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
            today: 'Сегодня',
            clear: 'Очистить',
            dateFormat: 'dd.mm.yyyy',
            timeFormat: 'hh:ii',
            firstDay: 1
        };
        $(this.elDropdownDateDatepicker).datepicker({
            range: true,
            clearButton: true,
            multipleDatesSeparator: ' - ',
            toggleSelected: true,
            navTitles: {
                days: 'MM <i>yyyy</i>'
            },
            nextHtml: '<svg width="17" height="18" viewBox="0 0 17 18" fill="#BC9CFF" xmlns="http://www.w3.org/2000/svg"><path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" fill="#BC9CFF"/></svg>',
            prevHtml: '<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="#BC9CFF"/>\n' +
                '</svg>\n',
        });

        this.addEventListenerForElDropdownDateDatepicker();
        this.addBtnApply();
        this.setStartDate()

    };
    addBtnApply() {
        let datepickerBtn = this.datepickerInst.nav.$buttonsContainer[0];
        let newBtnApply = document.createElement('span');
        newBtnApply.className = 'datepicker--button';
        newBtnApply.setAttribute('data-action', 'apply');
        newBtnApply.innerHTML = 'Применить';
        newBtnApply.addEventListener('click', () => {
            this.datepickerInst.hide();
        });

        datepickerBtn.appendChild(newBtnApply);
    };

    addEventListenerForElDropdownDateDatepicker() {
        this.component.addEventListener('click', () => {
            this.datepickerInst.show();
        });
    };

    setStartDate() {
        if (this.startDateFrom && this.startDateTo) {
            let startDate = [new Date(Date.parse(this.startDateFrom)), new Date(Date.parse(this.startDateTo))];
            this.datepickerInst.selectDate(startDate);
        }
    }
}


class DateDropdownGroup extends DateDropdown {
    constructor (component, componentsGroup) {
        super(component);
        this.componentsGroup = componentsGroup;
        this.dateFrom = $(this.componentsGroup[0].querySelector('.dropdown-date__datepicker')).datepicker().data('datepicker');
        this.dateTo = $(this.componentsGroup[1].querySelector('.dropdown-date__datepicker')).datepicker().data('datepicker');
        this.altField = document.createElement('input');
        this.addAltField();
        this.hideDropdownDateDatepicker();
        this.datepickerUpdate();
    };
    datepickerUpdate() {
        this.datepickerInst.update({
            onShow: (inst) => {
                inst.hide();
                this.dateFrom.show();
            },
            onSelect: () => {
                // console.log(this.altField);
                this.altField.value = this.datepickerInst._prevOnSelectValue;
            }
        });

        this.dateFrom.update({
            onShow: () => {},
            onSelect: (formattedDate, date) => {
                // this.dateTo.selectDate(date);
                // this.altField.value = this.dateFrom._prevOnSelectValue.slice(0, 10);
                // this.dropdownDateSelected.innerHTML = this.dateFrom._prevOnSelectValue.slice(0, 10);
                // this.dateFrom.el.value = this.dateFrom._prevOnSelectValue.slice(0, 10);
                // this.dateTo.el.value = this.dateFrom._prevOnSelectValue.slice(13, 23);
            }
        });
    };
    printDate() {

    }

    addAltField() {
        this.altField.classList.add('dropdown-date__alt-field');

        this.component.appendChild(this.altField);
    };

    hideDropdownDateDatepicker() {
        this.elDropdownDateDatepicker.classList.add('hide');
    }
}

function getSameNameAttributes (index, node, arr) {
    let sna =[];
    for(let i = 0; i < arr.length; i++){
        if (arr[i].getAttribute('data-name') === node.getAttribute('data-name')) {
            sna.push(arr[i]);
        }
    }

    if (sna.length !== 1)
        return sna;
    else
        return false;
}


let elements = $('.js-dropdown-date');
elements.each((index, node) => {
    if (!getSameNameAttributes(index, node, elements))
        new DateDropdown(node);
    else
        new DateDropdownGroup(node, getSameNameAttributes(index, node, elements));

});