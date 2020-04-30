import './like-button.scss'

class LikeButton {
    constructor (component) {
        this.component = component;
        this.numberLikes = this.component.querySelector('.like-button__number-likes');
        this.likes = +this.numberLikes.innerHTML;
        this.init();
    }
    init () {
        this.component.addEventListener('click', () => {
            if (this.component.classList.contains('clicked'))
                this.likes -= 1;
            else
                this.likes += 1;

            this.component.classList.toggle('clicked');
            this.numberLikes.innerHTML = this.likes;
        })
    }
}

$('.like-button').each((index, node) => {
    new LikeButton(node);
});