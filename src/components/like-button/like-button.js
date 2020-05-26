import './like-button.scss'

class LikeButton {
    constructor (component) {
        this.component = component;
        this.numberLikes = this.component.querySelector('.like-button__number-likes');
        this.likes = +this.component.getAttribute('data-likes');
        this.init();
    }
    init () {
        this.printLikes(this.likes);

        this.component.addEventListener('click', () => {
            if (this.component.classList.contains('clicked'))
                this.likes -= 1;
            else
                this.likes += 1;

            this.component.classList.toggle('clicked');
            this.printLikes(this.likes);

        })
    }
    printLikes (likes) {
        function crop (likes, splitter, symbol){
            let likesNumber = (likes / splitter), s = String(likesNumber), arr = s.split('.');
            arr[1]=arr[1]||'0';
            likesNumber = (arr[0]+'.'+arr[1].substring(0,1));

            if (likesNumber.includes('.0')) {
                likesNumber = Math.trunc(likesNumber);
            }

            return likesNumber += symbol;
        }

        if (likes >= 1000 && likes < 1000000) {
            likes = crop(likes, 1000, 'K');
        } else if (likes >= 1000000) {
            likes = crop(likes, 1000000, 'M');
        }

        this.numberLikes.innerHTML = likes;
    }
}

$('.like-button').each((index, node) => {
    new LikeButton(node);
});