import './dropdown.scss'
import '../../assets/plugins/iqdropdown'

$(document).ready(function () {
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
});


