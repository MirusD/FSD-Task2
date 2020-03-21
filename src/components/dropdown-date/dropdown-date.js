import './dropdown-date.scss'
import 'air-datepicker'

$('#date-from').datepicker({
    onSelect: (formattedDate, date, inst) => {
        if(inst.$datepicker[0].classList.contains('active')) {
            let dateTo = $('#date-to').datepicker().data('datepicker');
            dateTo.clear();
            dateTo.selectDate(date);
        }
        inst.el.value = inst._prevOnSelectValue.slice(0, 10);
    }
});
$('#date-to').datepicker({
    onSelect: (formattedDate, date, inst) => {
        if(inst.$datepicker[0].classList.contains('active')) {
            let dateFrom = $('#date-from').datepicker().data('datepicker');
            dateFrom.clear();
            dateFrom.selectDate(date);
        }

        inst.el.value = inst._prevOnSelectValue.slice(11);
    }
});