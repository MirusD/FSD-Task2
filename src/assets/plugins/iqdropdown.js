(function ($) {
    const defaults = {
        maxItems: Infinity,
        minItems: 0,
        selectionText: 'Selection text',
        textPlural: 'items',
        controls: {
            position: 'right',
            displayCls: 'iqdropdown-content',
            controlsCls: 'iqdropdown-item-controls',
            counterCls: 'counter',
        },
        items: {},
        optionsItems: [],
        onChange: () => {},
        beforeDecrement: () => true,
        beforeIncrement: () => true,
        setSelectionText (itemCount, totalItems) {
            const usePlural = totalItems !== 1 && this.textPlural.length > 0;
            const text = usePlural ? this.textPlural : this.selectionText;
            return `${totalItems} ${text}`;
        },
    };

    $.fn.iqDropdown = function (options) {
        this.each(function () {
            const $this = $(this);
            const $selection = $this.find('p.iqdropdown-selection').last();
            const $menu = $this.find('div.iqdropdown-menu');
            const $items = $menu.find('div.iqdropdown-menu-option');
            const $controlsBar = $menu.find('.iqdropdown__control-bar');
            const dataAttrOptions = {
                selectionText: $selection.data('selection-text'),
                textPlural: $selection.data('text-plural'),
            };
            const settings = $.extend(true, {}, defaults, dataAttrOptions, options);
            const itemCount = {};
            const counter = {};
            let totalItems = 0;
            const $resetBtn = $this.find('.' + settings.controls.resetBtn);
            const $applyBtn = $menu.find('.' + settings.controls.applyBtn);

            settings.selectionText = $selection.html() || defaults.selectionText;

            function updateDisplay () {
                $selection.html(settings.setSelectionText(itemCount, totalItems) || settings.selectionText);
            }

            function resetCount(id, $item) {
                totalItems = 0;
            }

            function setItemSettings (id, $item) {
                const minCount = Number($item.data('mincount'));
                const maxCount = Number($item.data('maxcount'));

                settings.items[id] = {
                    minCount: Number.isNaN(Number(minCount)) ? 0 : minCount,
                    maxCount: Number.isNaN(Number(maxCount)) ? Infinity : maxCount,
                };
            }

            function addControls (id, $item) {
                const $controls = $('<div />').addClass(settings.controls.controlsCls);
                const $decrementButton = $(`
                      <button class="button-decrement">
                        <i class="icon-decrement"></i>
                      </button>
                    `);
                const $incrementButton = $(`
                      <button class="button-increment">
                        <i class="icon-decrement icon-increment"></i>
                      </button>
                    `);
                const $counter = $(`<span>${itemCount[id]}</span>`).addClass(settings.controls.counterCls);
                counter[id] = $counter;

                $item.children('div').addClass(settings.controls.displayCls);
                $controls.append($decrementButton, $counter, $incrementButton);
                settings.optionsItems.push($controls);

                if (settings.controls.position === 'right') {
                    $item.append($controls);
                } else {
                    $item.prepend($controls);
                }

                function updateCounterDisplay (id) {
                    $counter.html(itemCount[id]);
                }

                if (itemCount[id] <= 0) {
                    $decrementButton.addClass('button-decrement_disable');
                }
                $decrementButton.click((event) => {
                    const { items, minItems, beforeDecrement, onChange } = settings;
                    const allowClick = beforeDecrement(id, itemCount);

                    if (allowClick && totalItems > minItems && itemCount[id] > items[id].minCount) {
                        itemCount[id] -= 1;
                        totalItems -= 1;
                        updateCounterDisplay(id);
                        updateDisplay();
                        onChange(id, itemCount[id], totalItems);
                    }
                    if (itemCount[id] <= 0) {
                        $decrementButton.addClass('button-decrement_disable');
                    }

                    event.preventDefault();
                });

                $incrementButton.click((event) => {
                    const { items, maxItems, beforeIncrement, onChange } = settings;
                    const allowClick = beforeIncrement(id, itemCount);

                    if (allowClick && totalItems < maxItems && itemCount[id] < items[id].maxCount) {
                        itemCount[id] += 1;
                        totalItems += 1;
                        updateCounterDisplay(id);
                        updateDisplay();
                        onChange(id, itemCount[id], totalItems);
                    }
                    if (itemCount[id] > 0) {
                        $decrementButton.removeClass('button-decrement_disable');
                    }
                    event.preventDefault();
                });

                $item.click(event => event.stopPropagation());

                return $item;
            }

            $controlsBar.click((event) => event.stopPropagation());
            $menu.click((event) => event.stopPropagation());

            $this.click(() => {
                $this.toggleClass('menu-open');
            });

            $resetBtn.click((event) => {
                for (let key in itemCount) {
                    itemCount[key] = 0;
                    counter[key].html(0);
                }
                totalItems = 0;
                settings.optionsItems.forEach((item) => {
                    item.find('.button-decrement').addClass('button-decrement_disable')
                });
                updateDisplay();
            });

            $applyBtn.click(() => {
                $this.toggleClass('menu-open');
            });

            $items.each(function () {
                const $item = $(this);
                const id = $item.data('id');
                const defaultCount = Number($item.data('defaultcount') || '0');

                itemCount[id] = defaultCount;
                totalItems += defaultCount;
                setItemSettings(id, $item);
                addControls(id, $item);
            });

            updateDisplay();
        });

        return this;
    };
}(jQuery));