import { HTTP } from './http.js';
import { Metric, Donut } from './donut.js';

export class Statistics {
    constructor() {
        document.getElementById('view-stats').addEventListener('click', () => {

            document.getElementById('main-tab-container').classList.add('tab2');
            document.getElementById('main-tab-container').classList.remove('tab1');
            this.generateStatistics();
        });

        document.getElementById('go-home-button').addEventListener('click', () => {
            document.getElementById('main-tab-container').classList.remove('tab2');
            document.getElementById('main-tab-container').classList.add('tab1');
        });
    }

    async generateStatistics() {
        // This is just a dummy REST service that always returns the same data
        const data = await HTTP.getJSON('https://dummyservice20191001071223.azurewebsites.net/api/alarms');

        const donut = new Donut('pie-chart', 'legend-container');
        const metrics = [
            new Metric('1st Alarm', data.filter(i => !i.snoozeDates || i.snoozeDates.length === 0).length),
            new Metric('1 Snooze', data.filter(i => i.snoozeDates && i.snoozeDates.length === 1).length),
            new Metric('2 Snoozes', data.filter(i => i.snoozeDates && i.snoozeDates.length === 2).length),
            new Metric('3 Or More Snoozes', data.filter(i => i.snoozeDates && i.snoozeDates.length >= 3).length),
        ];

        donut.generateChart(metrics);
    }
}
