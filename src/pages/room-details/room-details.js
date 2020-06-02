import './room-details.scss'

// let Circle = function(sel){
//     let circles = document.querySelectorAll(sel);
//         // let great = parseFloat(circles[0].innerHTML);
//         let great = (60*408/100) - 5;
//         let good = (20*408/100) - 5;
//         let satisfactorily = (10*408/100) - 5;
//         let disappointed = (10*408/100) - 5;
//         circles[0].innerHTML = '<svg width="160" height="160">' +
//             '<circle class="circle__great" transform="rotate(-90)" style="stroke-dasharray: '+great+'px, 408px;" r="65" cx="-80" cy="80" />' +
//             '<circle class="circle__good"transform="rotate(-90)" style="stroke-dasharray: '+good+'px, 408px; stroke-dashoffset: '+(-great - 5)+'px" r="65" cx="-80" cy="80" />' +
//             '<circle class="circle__satisfactorily"transform="rotate(-90)" style="stroke-dasharray: '+satisfactorily+'px, 408px; stroke-dashoffset: '+(-great - good - 10)+'px" r="65" cx="-80" cy="80" />' +
//             '<circle class="circle__disappointed"transform="rotate(-90)" style="stroke-dasharray: '+disappointed+'px, 408px; stroke-dashoffset: '+(-great - good - disappointed - 15)+'px" r="65" cx="-80" cy="80" />' +
//             '</svg>';
// };
// Circle('.great');

class pieChart {
    constructor (component) {
        this.component = component;
        this.elPieChartGreat = this.component.querySelector('.pieChart__great');
        this.elPieChartGood = this.component.querySelector('.pieChart__good');
        this.elPieChartSatisfactorily = this.component.querySelector('.pieChart__satisfactorily');
        this.elPieChartDisappointed = this.component.querySelector('.pieChart__disappointed');
        this.init();
    }
    init() {
        let great = parseFloat(this.elPieChartGreat.innerHTML);
        let disappointed = 1;
        let satisfactorily = 21;
        let good = 28;

        great = great*408/100;
        good = good*408/100;
        satisfactorily = satisfactorily*408/100;
        disappointed = disappointed*408/100;

        this.component.innerHTML = '<svg width="160" height="160">' +
            '<circle class="disappointed"transform="rotate(-90)" style="stroke-dasharray: '+(disappointed)+'px, 408px; stroke-dashoffset: 0px" r="65" cx="-80" cy="80" />' +
            '<circle class="satisfactorily"transform="rotate(-90)" style="stroke-dasharray: '+satisfactorily+'px, 408px; stroke-dashoffset: '+(-disappointed)+'px" r="65" cx="-80" cy="80" />' +
            '<circle class="good"transform="rotate(-90)" style="stroke-dasharray: '+good+'px, 408px; stroke-dashoffset: '+(-disappointed - satisfactorily)+'px" r="65" cx="-80" cy="80" />' +
            '<circle class="great" transform="rotate(-90)" style="stroke-dasharray: '+great+'px, 408px; stroke-dashoffset: '+(-disappointed - satisfactorily - good)+'px" r="65" cx="-80" cy="80" />' +
            '<circle class="zero"transform="rotate(-90)" style="stroke-dasharray: 2.5px, 408px; stroke-dashoffset: 0px" r="65" cx="-80" cy="80" />' +
            '<circle class="disappointed-space" transform="rotate(-90)" style="stroke-dasharray: 5px, 408px; stroke-dashoffset: '+(-disappointed + 2.5)+'px" r="65" cx="-80" cy="80" />' +
            '<circle class="satisfactorily-space" transform="rotate(-90)" style="stroke-dasharray: 5px, 408px; stroke-dashoffset: '+(-disappointed - satisfactorily + 2.5)+'px" r="65" cx="-80" cy="80" />' +
            '<circle class="good-space" transform="rotate(-90)" style="stroke-dasharray: 5px, 408px; stroke-dashoffset: '+(-disappointed - satisfactorily - good + 2.5)+'px" r="65" cx="-80" cy="80" />' +
            '<circle class="great-space" transform="rotate(-90)" style="stroke-dasharray: 5px, 408px; stroke-dashoffset: '+(-disappointed - satisfactorily - good - great + 2.5)+'px" r="65" cx="-80" cy="80" />' +
            '</svg>';
    }
}

document.querySelectorAll('.pieChart').forEach(node => {
   new pieChart(node);
});
