import './dropdown-date.scss'
import 'air-datepicker'

let dropdownDate = $('.dropdown-date');

for(let i = 0; i < dropdownDate.length; i++) {
    let item = dropdownDate.eq(i).find('.datepicker-here');

    item.eq(0).datepicker({
        onSelect: (formattedDate, date, inst) => {
            if(inst.$datepicker[0].classList.contains('active')) {
                let dateTo = item.eq(1).datepicker().data('datepicker');
                dateTo.clear();
                dateTo.selectDate(date);
            }
            inst.el.value = inst._prevOnSelectValue.slice(0, 10);
        }
    });

    item.eq(1).datepicker({
        onSelect: (formattedDate, date, inst) => {
            if(inst.$datepicker[0].classList.contains('active')) {
                let dateFrom = item.eq(0).datepicker().data('datepicker');
                dateFrom.clear();
                dateFrom.selectDate(date);
            }

            inst.el.value = inst._prevOnSelectValue.slice(11);
        }
    });
}

