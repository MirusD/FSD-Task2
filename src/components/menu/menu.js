import './menu.scss';

class Menu {
    constructor(components) {
        this.components = components;
        this.jsMenuButton = this.components.querySelector('.js-menu__button');
        this.jsButtonIcon = this.jsMenuButton.querySelector('.js-button__icon');
        this.jsMenuList = this.components.querySelector('.js-menu__list');
        this.init();
    }
    init() {
        this.jsMenuButton.addEventListener('click', () => {
            this.jsButtonIcon.classList.toggle('menuexpanded');
            this.jsMenuList.classList.toggle('menu__list_expanded');
        })
    }
}

document.querySelectorAll('.js-menu').forEach(node => {
    new Menu(node);
});
