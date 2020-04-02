import './dropdown-date.scss'
import 'air-datepicker'
import {updatePrice} from "../reservation-card/reservation-card";

let dropdownDate = $('.dropdown-date');
for(let i = 0; i < dropdownDate.length; i++) {
    let item = dropdownDate.eq(i).find('.datepicker-here');
    let startDate = new Date(item[0].placeholder.split(".").reverse().join("-"));
    let endDate = new Date(item[1].placeholder.split(".").reverse().join("-"));
    let dateFrom = item.eq(0).datepicker().data('datepicker');
    let dateTo = item.eq(1).datepicker().data('datepicker');

    let dates = [startDate, endDate];

    hack();

    item.eq(0).datepicker({
        toggleSelected: true,
        range: true,
        position: "bottom left",
        onSelect: (formattedDate, date, inst) => {
            console.log(inst);
            if(inst.$datepicker[0].classList.contains('active')) {
                dateTo.clear();
                dateTo.selectDate(date);
            }
            if (date.length === 2) {
                inst.el.value = inst.el.value.slice(0, 10);
                updatePrice((date[1] - date[0]) / (60 * 60 * 24 * 1000), inst.el);
            }
        },
    });

    item.eq(1).datepicker({
        toggleSelected: true,
        range: true,
        position: "bottom right",
        onSelect: (formattedDate, date, inst) => {
            if(inst.$datepicker[0].classList.contains('active')) {
                dateFrom.clear();
                dateFrom.selectDate(date);
            }
            if (date.length === 2) {
                inst.el.value = inst._prevOnSelectValue.slice(11);
                updatePrice((date[1] - date[0]) / (60 * 60 * 24 * 1000), inst.el);
            }
        }
    });

    if (!isNaN(startDate.getTime())) {
        dateFrom.selectDate(dates);
        dateTo.selectDate(dates);
        updatePrice((endDate - startDate) / (60 * 60 * 24 * 1000), dropdownDate[i]);

    }

    function hack () {
        item.eq(0).css('color', 'transparent');
        item.eq(1).css('color', 'transparent');

        setTimeout(setDefaultValue, 500);
        function setDefaultValue () {
            for (let i = 0; i < 2; i++) {
                item.eq(i).val(item.eq(i).attr('placeholder'));
                item.eq(i).css('color', '');
            }
        }
    }

}

