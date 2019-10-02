import { Utilities } from './utilities.js';

export class Donut {
    constructor(canvasId, legendContainerId) {
        this.canvasId = canvasId;
        this.legendContainerId = legendContainerId;
        this.colors = [
            '#9600FF', '#AEBAF8', 'blue', 'orange', 'purple', 'yellow'
        ];
    }

    generateChart(metrics) {
        var c = document.getElementById(this.canvasId);
        var ctx = c.getContext("2d");

        const total = metrics.map(i => i.value).reduce((a, b) => a + b);
        let currentAngleRadians = 0;

        Utilities.clearDOMChildren(this.legendContainerId);

        for (let i = 0; i < metrics.length; i++) {
            const metric = metrics[i];

            const percent = (metric.value / total) * 100;
            const degrees = percent * 3.6;
            const radians = this.degreesToRadians(degrees);

            ctx.strokeStyle = this.colors[i];
            ctx.lineWidth = 40;
            ctx.beginPath();
            ctx.arc(75, 75, 50, currentAngleRadians, currentAngleRadians + radians);
            ctx.stroke();

            currentAngleRadians += radians;

            let legendItemTemplate = document.getElementById('legend-item').innerHTML;

            legendItemTemplate = Utilities.replaceStringWithObject(legendItemTemplate, metric, Metric.prototype);
            legendItemTemplate = legendItemTemplate.replace('{{color}}', this.colors[i]);
            const legendItemDiv = document.createElement('div');
            legendItemDiv.innerHTML = legendItemTemplate;

            document.getElementById(this.legendContainerId).appendChild(legendItemDiv);
        }
    }


    degreesToRadians(degrees) {
        var pi = Math.PI;
        return degrees * (pi / 180);
    }


}

export class Metric {
    constructor(name, value, color) {
        this.name = name;
        this.value = value;
    }
}