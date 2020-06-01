import './room-details.scss'

let Circle = function(sel){
    let circles = document.querySelectorAll(sel);
        // let great = parseFloat(circles[0].innerHTML);
        let great = (60*408/100) - 5;
        let good = (20*408/100) - 5;
        let satisfactorily = (10*408/100) - 5;
        let disappointed = (10*408/100) - 5;
        circles[0].innerHTML = '<svg width="160" height="160">' +
            '<circle class="circle__great" transform="rotate(-90)" style="stroke-dasharray: '+great+'px, 408px;" r="65" cx="-80" cy="80" />' +
            '<circle class="circle__good"transform="rotate(-90)" style="stroke-dasharray: '+good+'px, 408px; stroke-dashoffset: '+(-great - 5)+'px" r="65" cx="-80" cy="80" />' +
            '<circle class="circle__satisfactorily"transform="rotate(-90)" style="stroke-dasharray: '+satisfactorily+'px, 408px; stroke-dashoffset: '+(-great - good - 10)+'px" r="65" cx="-80" cy="80" />' +
            '<circle class="circle__disappointed"transform="rotate(-90)" style="stroke-dasharray: '+disappointed+'px, 408px; stroke-dashoffset: '+(-great - good - disappointed - 15)+'px" r="65" cx="-80" cy="80" />' +
            '</svg>';
};
Circle('.great');
