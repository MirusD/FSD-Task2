import '../../assets/plugins/iqdropdown'
import './dropdown.scss'

class Dropdown {
    constructor(component) {
        this.component = component;
        this.iqdropdownMenuOptions = this.component.find('.iqdropdown-menu-option');
        this.selectionText = this.component.find('.iqdropdown-selection')[0].textContent;
        this.items = this.itemsInit();
        this.init();
    }
    init() {
        this.component.iqDropdown({
            maxItems: 10,
            minItems: 0,
            selectionText: 'item',
            textPlural: 'items',
            controls: {
                resetBtn: 'iqdropdown__btn-clear',
                applyBtn: 'iqdropdown__btn-apply'
            },
            setSelectionText: (itemCount, totalItems) => {
                let idItems = [];
                let itemsCopy = {};
                let selectionText = '';

                for (let prop in this.items) {
                    this.items[prop].count = itemCount[prop];
                    itemsCopy[prop] = this.items[prop];
                    idItems.push(prop);
                }

                for (let i = 1; i < idItems.length; i++) {
                    if (itemsCopy[idItems[i]].textPlural[0] === itemsCopy[idItems[i - 1]].textPlural[0]) {
                        itemsCopy[idItems[i]].count += itemsCopy[idItems[i - 1]].count;
                        delete itemsCopy[idItems[i - 1]];
                    }
                }

                for (let prop in itemsCopy) {
                    if (itemsCopy[prop].count !== 0) {
                        selectionText += itemsCopy[prop].count + ' ' + getTextPluralStr(itemsCopy[prop].count, itemsCopy[prop].textPlural) + ', ';
                    }
                }

                if (totalItems <= 0) selectionText = this.selectionText;
                if (selectionText.lastIndexOf(',') !== -1)
                    selectionText = selectionText.slice(0, selectionText.lastIndexOf(','));

                return selectionText;
            },
        });

        function getTextPluralStr(n, text_form) {
            if (Array.isArray(text_form)) {
                n = Math.abs(n);
                if (n >= 5) {
                    return text_form[2];
                }
                if (n > 1 && n < 5) {
                    return text_form[1];
                }
                if (n === 1) {
                    return text_form[0];
                }
                return text_form[0];
            } else return "error";
        }
    }
    itemsInit() {
        class Item {
            constructor(count, textPlural) {
                this.count = +count;
                this.textPlural = textPlural;
            }
        }

        let items = {};

        for(let i=0; i<this.iqdropdownMenuOptions.length; i++) {
            let dataId = this.iqdropdownMenuOptions[i].getAttribute('data-id');
            let dataDefaultCount = this.iqdropdownMenuOptions[i].getAttribute('data-defaultcount');
            let dataTextPlural = this.iqdropdownMenuOptions[i].getAttribute('data-textplural').split(',');

            items[dataId] = new Item(dataDefaultCount, dataTextPlural);
        }
        return items;
    }
}

$('.iqdropdown').each((index, node) => {
    new Dropdown($(node));
});