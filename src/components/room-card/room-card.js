import '../../../node_modules/slick-carousel/slick/slick.css'
// import '../../../node_modules/slick-carousel/slick/slick-theme.css'
import 'slick-carousel'
import './room-card.scss'

class RoomCard {
    constructor (component) {
        this.component = component;
        this.init();
    }
    init () {
      this.component.slick({
          dots: true
      })
    };
}

$('.room-card__slider').each((index, node) => {
    new RoomCard($(node));
});

// $('.room-card__slider').slick({
//     dots: true
// });

// $('.room-card__slider.arrows-off').slick({
//     dots: true,
//     arrows: true
// });