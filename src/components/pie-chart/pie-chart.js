import './pie-chart.scss'

class pieChart {
    constructor (component) {
        this.component = component;
        this.elGraph = this.component.querySelector('.pie-chart__graph');
        this.elPieChartGreat = this.component.querySelector('.pie-chart__great');
        this.elPieChartGood = this.component.querySelector('.pie-chart__good');
        this.elPieChartSatisfactorily = this.component.querySelector('.pie-chart__satisfactorily');
        this.elPieChartDisappointed = this.component.querySelector('.pie-chart__disappointed');
        this.init();
    }
    init() {
        this.elGraph.appendChild(this.creatSvgGraph());
    }
    creatTotalVoices(total) {
        let totalVoices = document.createElement('div');
        let totalVoicesNumber = document.createElement('span');
        let totalVoicesText = document.createElement('span');

        totalVoicesNumber.classList.add('pie-chart__total-voices_number');
        totalVoicesText.classList.add('pie-chart__total-voices_text');
        totalVoicesNumber.innerHTML = total;
        totalVoicesText.innerHTML = 'голосов';
        totalVoices.classList.add('pie-chart__total-voices');
        totalVoices.appendChild(totalVoicesNumber);
        totalVoices.appendChild(totalVoicesText);

        return totalVoices;
    }
    creatSvgGraph() {
        let great = parseFloat(this.elPieChartGreat.innerHTML);
        let disappointed = parseFloat(this.elPieChartDisappointed.innerHTML);
        let satisfactorily = parseFloat(this.elPieChartSatisfactorily.innerHTML);
        let good = parseFloat(this.elPieChartGood.innerHTML);

        let total = great + disappointed + satisfactorily + good;

        great = (great*100/total)*408/112;
        good = (good*100/total)*408/112;
        satisfactorily = (satisfactorily*100/total)*408/112;
        disappointed = (disappointed*100/total)*408/112;

        let svgGraph = document.createElement('div');
        svgGraph.classList.add('pie-chart__svg-graph');
        svgGraph.innerHTML = '<svg width="122" height="122">' +
            '<circle class="disappointed"transform="rotate(-90)" style="stroke-dasharray: '+(disappointed)+'px, 408px; stroke-dashoffset: 0px" r="58" cx="-60" cy="60" />' +
            '<circle class="satisfactorily"transform="rotate(-90)" style="stroke-dasharray: '+satisfactorily+'px, 408px; stroke-dashoffset: '+(-disappointed)+'px" r="58" cx="-60" cy="60" />' +
            '<circle class="good"transform="rotate(-90)" style="stroke-dasharray: '+good+'px, 408px; stroke-dashoffset: '+(-disappointed - satisfactorily)+'px" r="58" cx="-60" cy="60" />' +
            '<circle class="great" transform="rotate(-90)" style="stroke-dasharray: '+great+'px, 408px; stroke-dashoffset: '+(-disappointed - satisfactorily - good)+'px" r="58" cx="-60" cy="60" />' +
            '<circle class="zero"transform="rotate(-90)" style="stroke-dasharray: 2.5px, 408px; stroke-dashoffset: 0px" r="68" cx="-60" cy="60" />' +
            '<circle class="disappointed-space" transform="rotate(-90)" style="stroke-dasharray: 2.5px, 408px; stroke-dashoffset: '+(-disappointed + 1.7)+'px" r="58" cx="-60" cy="60" />' +
            '<circle class="satisfactorily-space" transform="rotate(-90)" style="stroke-dasharray: 2.5px, 408px; stroke-dashoffset: '+(-disappointed - satisfactorily + 1.7)+'px" r="58" cx="-60" cy="60" />' +
            '<circle class="good-space" transform="rotate(-90)" style="stroke-dasharray: 2.5px, 408px; stroke-dashoffset: '+(-disappointed - satisfactorily - good + 1.7)+'px" r="58" cx="-60" cy="60" />' +
            '<circle class="great-space" transform="rotate(-90)" style="stroke-dasharray: 2.5px, 408px; stroke-dashoffset: '+(-disappointed - satisfactorily - good - great + 1.7)+'px" r="58" cx="-60" cy="60" />' +
            '</svg>';
        svgGraph.appendChild(this.creatTotalVoices(total));
        this.elGraph.innerHTML = '';
        return svgGraph;
    }
}

document.querySelectorAll('.pie-chart').forEach(node => {
    new pieChart(node);
});