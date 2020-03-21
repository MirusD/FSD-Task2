import '../../assets/plugins/iqdropdown'
import '../../../node_modules/air-datepicker/dist/css/datepicker.min.css'
import 'air-datepicker'
import './dropdown.scss'


$('.dropdown_big').iqDropdown({
    maxItems: 100,
    minItems: 0,
    selectionText: 'item',
    textPlural: 'items',
    controls: {
        resetBtn: 'iqdropdown__btn-clear',
        applyBtn: 'iqdropdown__btn-apply'
    },
    setSelectionText : (itemCount, totalItems) => {
        if (totalItems === 1) {
            return totalItems + ' гость';
        } else if (1 < totalItems && totalItems < 5) {
            return totalItems + ' гостя';
        } else if (totalItems >= 5) {
            return totalItems + ' гостей';
        }
    }
});

$('.dropdown_middle').iqDropdown({
    maxItems: 100,
    minItems: 0,
    selectionText: 'item',
    textPlural: 'items',
    controls: {
        resetBtn: 'iqdropdown__btn-clear',
        applyBtn: 'iqdropdown__btn-apply'
    },
    setSelectionText : (itemCount, totalItems) => {
        let rooms = [];
        let count = 0;

        for (let key in itemCount) {

            function pushRooms (key, text1, text2, text3) {
                if (itemCount[key] === 1) {
                    rooms.push(itemCount[key] + ' ' + text1);
                } else if (itemCount[key] > 1 && itemCount[key] < 5 ) {
                    rooms.push(itemCount[key] + ' ' + text2);
                } else if (itemCount[key] > 4) {
                    rooms.push(itemCount[key] + ' ' + text3);
                }
            }

            if (count === 0) {
                pushRooms(key, 'спальня', 'спальни', 'спален' );
            } else if (count === 1) {
                pushRooms(key, 'кровать', 'кровати', 'кроватей' );
            } else if (count === 2) {
                pushRooms(key, 'ванная комната', 'ванные комнаты', 'ванных комнат' );
            }
            count++;
        }

        if (rooms.length > 0) {
            let text = rooms.join(', ');
            if (text.length > 19) {
                return text.slice(0, 20) + '...';
            }
            return text;
        }
    }
});

$('.datepicker-here').datepicker({
    range: true,
    clearButton: true,
    toggleSelected: true,
    navTitles: {
        days: 'MM <i>yyyy</i>'
    },
    nextHtml: '<svg width="17" height="18" viewBox="0 0 17 18" fill="#BC9CFF" xmlns="http://www.w3.org/2000/svg"><path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" fill="#BC9CFF"/></svg>',
    prevHtml: '<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="#BC9CFF"/>\n' +
        '</svg>\n',
    onShow: (inst, animationCompleted) => {
        inst.$datepicker[0].querySelector('.datepicker--button[data-action="apply"]').addEventListener('click', () => inst.hide())
    }
});

function addBtnApply () {
    let datepickerBtn = document.querySelectorAll('.datepicker--buttons');

    datepickerBtn.forEach((item, index, array) => {
        let newBtnApply = document.createElement('span');
        newBtnApply.className = 'datepicker--button';
        newBtnApply.setAttribute('data-action', 'apply');
        newBtnApply.innerHTML = 'Применить';

        item.appendChild(newBtnApply);
    });
}

addBtnApply();




