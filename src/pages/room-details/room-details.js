import './room-details.scss'

let Circle = function(sel){
    let circles = document.querySelectorAll(sel);
        let valEl = parseFloat(circles[0].innerHTML);
        valEl = valEl*408/100;
        let valEl2 = 20*408/100;
        circles[0].innerHTML = '<svg width="160" height="160"><circle transform="rotate(-90)" r="65" cx="-80" cy="80" /><circle transform="rotate(-90)" style="stroke-dasharray:'+valEl+'px 408px;" r="65" cx="-80" cy="80" /><circle transform="rotate(-90)" style="stroke-dasharray:'+valEl2+'px '+valEl+'px" r="65" cx="-80" cy="80" /></svg>';
};
Circle('.great');
