import '../../../node_modules/slick-carousel/slick/slick.css'
// import '../../../node_modules/slick-carousel/slick/slick-theme.css'
import 'slick-carousel'
import './room-card.scss'

class RoomCard {
    constructor (component) {
        this.component = component;
        this.elRoomCardSlider = this.component.querySelector('.room-card__slider');
        this.elPriceDay = this.component.querySelector('.room-card_weight_bold');
        this.formatter = new Intl.NumberFormat('ru', {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0
        });
        this.init();
    }
    init () {
        $(this.elRoomCardSlider).slick({
          dots: true
      });
        this.elPriceDay.innerHTML = this.formatter.format(this.elPriceDay.getAttribute('data-price-day')).replace(/\s(?=\p{Sc})/gu, '');
    };
}

let elements = document.querySelectorAll('.room-card');
elements.forEach((node) => {
    new RoomCard(node);
});