import './reservation-card.scss'

let bookingCards = document.querySelectorAll('.reservation-card');

function updatePrice (day, el) {
    let bookingCard = el.closest('.reservation-card');
    if (bookingCard) {
        let elServicesPrices = bookingCard.querySelectorAll('.services__price');
        let elServicesFirstDescription = bookingCard.querySelector('.services__description');
        let elRoomInfoPriceDay = bookingCard.querySelector('.room-info__price-day');
        let elPriceTotal = bookingCard.querySelector('.price__total');
        let total = 0;
        let formatter = new Intl.NumberFormat('ru', {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0
        });

        elServicesFirstDescription.innerHTML = `${elRoomInfoPriceDay.innerHTML} x ${day} суток `;
        elServicesPrices[0].innerHTML = formatter.format(parseInt(elRoomInfoPriceDay.innerHTML.replace(/\s/g,'')) * day).replace(/\s(?=\p{Sc})/gu, '');

        for (let i = 0; i < elServicesPrices.length; i++) {
            total += parseInt(elServicesPrices[i].innerHTML.replace(/[\s&nbsp;]/g, ''));
        }

        if (total > 0) {
            elPriceTotal.innerHTML = formatter.format(total).replace(/\s(?=\p{Sc})/gu, '');
        } else {
            elPriceTotal.innerHTML = 'Не число';
        }
    }
}

bookingCards.forEach((item) => {
    updatePrice (0, item.firstElementChild);
});

export { updatePrice }