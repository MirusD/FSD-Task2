import './reservation-card.scss'

class EventEmitter {
    constructor() {
        this.events = {};
        this.formatter = new Intl.NumberFormat('ru', {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0
        });
    }
    on(evt, listener) {
        (this.events[evt] || (this.events[evt] = [])).push(listener);
    }
    emit(evt, arg) {
        (this.events[evt] || []).slice().forEach(lsn => lsn(arg));
    }
}

class ReservationCard extends EventEmitter{
    constructor(component) {
        super();
        this.component = component;
        this.elRangeDates = this.component.querySelector('.dropdown-date__datepicker');
        this.elReservationCardServices = this.component.querySelector('.reservation-card__services');
        this.elReservationCardServicesItems = this.elReservationCardServices.querySelectorAll('.services__item');
        this.elRoomInfoPriceDay = this.component.querySelector('.room-info__price-day');
        this.elPriceTotal = this.component.querySelector('.price__total');

        this.init();
    }
    init() {
        const model = new ReservationCardModel({
                rangeDates: $(this.elRangeDates).datepicker().data('datepicker').selectedDates,
                priceDay: this.elRoomInfoPriceDay.getAttribute('data-price-day'),
                services: this.elReservationCardServicesItems
            }),
            view = new ReservationCardView(model, {
                elRangeDates: this.elRangeDates,
                elReservationCardServices: this.elReservationCardServices,
                elReservationCardServicesItems: this.elReservationCardServicesItems,
                elRoomInfoPriceDay: this.elRoomInfoPriceDay,
                elPriceTotal: this.elPriceTotal
            }),
            controller = new ReservationCardController(model, view);

        view.render();
    }
}

class ServicesItem extends EventEmitter{
    constructor(name, price, discount, mark) {
        super();
        this.name = name;
        this.price = price;
        this.discount = discount || 0;
        this.mark = mark;
    }
    create() {
        let servicesItem = document.createElement('p');
        let servicesDescription = document.createElement('span');
        let servicesPrice = document.createElement('span');
        servicesItem.classList.add('services__item');
        servicesDescription.classList.add('services__description');
        if(this.mark) servicesDescription.classList.add('services__mark');
        servicesPrice.classList.add('services__price');
        servicesDescription.innerHTML = this.name;
        servicesPrice.innerHTML = this.formatter.format(this.price).replace(/\s(?=\p{Sc})/gu, '');

        servicesItem.appendChild(servicesDescription);
        servicesItem.appendChild(servicesPrice);

        return servicesItem;
    }
}

class ReservationCardModel extends EventEmitter {
    constructor(data) {
        super();
        this.priceDay = data.priceDay;
        this.dayDelta = 0;
        this.rangeDates = data.rangeDates;
        this.services = function () {
            let arr = [];
            data.services.forEach(item => {
                arr.push(new ServicesItem(item.firstChild.innerText, +item.lastChild.innerText, item.lastChild.getAttribute('data-discount'), item.firstChild.classList.contains('services__mark')));
            });
            return arr;
        }();
        this.priceTotal = 0;

        this.init();
    }
    init() {
        this.calDeltaDay();
        this.updateServiceItems();
        this.calPriceTotal();
    }
    changeDates(newRangeDates) {
        this.rangeDates = newRangeDates;
        this.init();
        this.emit('changeDates', newRangeDates);
    }
    calDeltaDay() {
        this.dayDelta = Math.ceil(this.rangeDates[1].getTime() - this.rangeDates[0].getTime()) / (1000 * 3600 * 24);
    }
    calPriceTotal() {
        this.priceTotal = this.services.reduce((sum, item) => {
            return +sum + item.price - item.discount;
        },0);
    }
    updateServiceItems() {
        this.services[0] = new ServicesItem(`${this.formatter.format(this.priceDay).replace(/\s(?=\p{Sc})/gu, '')} x ${this.dayDelta} суток`, this.priceDay * this.dayDelta);
    }


}

class ReservationCardView extends EventEmitter {
    constructor(model, elements) {
        super();
        this.model = model;
        this.elements = elements;

        model.on('changeDates', () => this.render());

        $(this.elements.elRangeDates).datepicker().data('datepicker').update({
            onHide: (inst) => {
                this.emit('dateChanged', inst.selectedDates);
            }
        });
    }
    render() {
        this.elements.elRoomInfoPriceDay.innerHTML = this.formatter.format(this.model.priceDay).replace(/\s(?=\p{Sc})/gu, '');

        while (this.elements.elReservationCardServices.firstChild) {
            this.elements.elReservationCardServices.removeChild(this.elements.elReservationCardServices.firstChild);
        }
        this.model.services.forEach(item => {
            this.elements.elReservationCardServices.append(item.create());
        });

        this.elements.elPriceTotal.innerHTML = this.formatter.format(this.model.priceTotal).replace(/\s(?=\p{Sc})/gu, '');
    }
}


class ReservationCardController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('dateChanged', nrd => this.changeTheDate(nrd));
    }

    changeTheDate(newRangeDates) {
        this.model.changeDates(newRangeDates);
    }
}


let components = document.querySelectorAll('.reservation-card');
components.forEach(node => {
    new ReservationCard(node);
});