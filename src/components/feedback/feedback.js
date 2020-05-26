import './feedback.scss'

class Feedback {
    constructor(component) {
        this.component = component;
        this.elFeedbackCountDownDays = this.component.querySelector('.feedback__countdown-days');
        this.init();
    }
    init() {
        let currentDate = new Date();
        let createDate = new Date(this.elFeedbackCountDownDays.getAttribute('data-create-date'));
        this.elFeedbackCountDownDays.innerHTML = this.getCountDownDays(currentDate, createDate);
    };
    getCountDownDays(currentDate, createDate) {
        let countDownDays = currentDate - createDate;
        let minutes = parseInt(countDownDays/(1000*60))%60;
        let hours =  parseInt(countDownDays/(1000*60*60))%24;
        let days = parseInt(countDownDays/(1000*60*60*24));
        let options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC'
        };
        if(days > 0) {
            if(days >= 365) return `${createDate.toLocaleString("ru", options)}`;
            else if (days >= 30 && days < 60) return `1 месяц назад`;
            else if (days >= 60 && days < 150) return `${Math.trunc(days / 30)} месяца назад`;
            else if (days >= 150) return `${Math.trunc(days / 30)} месяцев назад`;
            else if (days >= 7 && days < 14) return 'неделю назад';
            else if (days >= 14 && days < 21) return 'две недели назад';
            else if (days >= 21) return 'три недели назад';
            else if (days >= 5) return `${days} дней назад`;
            else if (days >= 2 && days <= 4) return `${days} дня назад`;
            else if (days === 1) return `${days} день назад`;
        } else if(hours > 0) {
            if ((hours >= 5 && hours <= 20) || hours % 10 >= 5) return `${hours} часов назад`;
            else if (hours % 10 >= 2 && hours % 10 <= 4) return `${hours} часа назад`;
            else if (hours % 10 === 1) return `${hours} час назад`;
        } else {
            if (minutes < 0) return 'только что';
            else if ((minutes >= 5 && minutes <= 20) || minutes % 10 >= 5) return `${minutes} минут назад`;
            else if (minutes % 10 >= 2 && minutes % 10 <= 4) return `${minutes} минуты назад`;
            else if (minutes % 10 === 1) return `${minutes} минуту назад`;
        }
    }

}

let component = document.querySelectorAll('.js-feedback');
component.forEach(node => {
   new Feedback(node);
});