import '../../../node_modules/air-datepicker/dist/css/datepicker.min.css'
import 'air-datepicker'
import './date.scss'

class Date {
    constructor(component) {
        this.$component = component;
        this.datepickerInst = this.$component.datepicker().data('datepicker');
        this.init();
        this.addBtnApply();
    };
    init() {
        this.$component.datepicker.language['ru'] = {
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
        this.$component.datepicker({
            range: true,
            clearButton: true,
            toggleSelected: true,
            multipleDatesSeparator: ' - ',
            navTitles: {
                days: 'MM <i>yyyy</i>'
            },
            nextHtml: '<svg width="17" height="18" viewBox="0 0 17 18" fill="#BC9CFF" xmlns="http://www.w3.org/2000/svg"><path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" fill="#BC9CFF"/></svg>',
            prevHtml: '<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="#BC9CFF"/>\n' +
                '</svg>\n',
        })
    };
    addBtnApply() {
        let datepickerBtn = this.datepickerInst.nav.$buttonsContainer[0];
        let newBtnApply = document.createElement('span');
        newBtnApply.className = 'datepicker--button';
        newBtnApply.setAttribute('data-action', 'apply');
        newBtnApply.innerHTML = 'Применить';
        this.addEventListener(newBtnApply);

        datepickerBtn.appendChild(newBtnApply);
    };
    addEventListener(newBtnApply) {
        return newBtnApply.addEventListener('click', () => {
            this.datepickerInst.hide()
        });
    };
}


class DateGroup extends Date {
    constructor (component, componentsGroup) {
        super(component);
        this.componentsGroup = componentsGroup;
        this.dateFrom = $(this.componentsGroup[0]).datepicker().data('datepicker');
        this.dateTo = $(this.componentsGroup[1]).datepicker().data('datepicker');
        this.datepickerUpdate(this.$component);
    };
    datepickerUpdate() {
        console.log(this.$component);
        this.datepickerInst.update({
            onShow: (inst) => {
                inst.hide();
                this.dateFrom.show();
            }
        });
        this.dateFrom.update({
            onShow: () => {},
            onSelect: (formattedDate, date) => {
                this.dateTo.selectDate(date);
                this.dateFrom.el.value = this.dateFrom.el.value.slice(0, 10);
                this.dateTo.el.value = this.dateFrom._prevOnSelectValue.slice(13, 23);
            }
        });
    };
}

function getSameNameAttributes (index, node, arr) {
    let sna =[];
    for(let i = 0; i < arr.length; i++){
        if (arr[i].getAttribute('name') === node.getAttribute('name')) {
            sna.push(arr[i]);
        }
    }

    if (sna.length !== 1)
        return sna;
    else
        return false;
}


let elements = $('.date');
elements.each((index, node) => {
    if (!getSameNameAttributes(index, node, elements))
        new Date($(node));
    else
        new DateGroup($(node), getSameNameAttributes(index, node, elements));

});