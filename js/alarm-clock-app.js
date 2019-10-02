import { Clock } from './clock.js';
import { AlarmEditor } from './alarm-editor.js';
import { HTTP } from './http.js';
import { Metric, Donut } from './donut.js';

// Don't pollute the global namespace
(function () {
    // JavaScript Object - Object Creation
    const clock = new Clock();
    clock.start();

    new AlarmEditor(clock);

    HTTP.getJSON('https://dummyservice20191001071223.azurewebsites.net/api/alarms').then(data => {
        console.log(data);
        const donut = new Donut('pie-chart', 'legend-container');
        const metrics = [
            new Metric('1st Alarm', data.filter(i => !i.snoozeDates || i.snoozeDates.length === 0).length),
            new Metric('1 Snooze', data.filter(i => i.snoozeDates && i.snoozeDates.length === 1).length),
            new Metric('2 Snoozes', data.filter(i => i.snoozeDates && i.snoozeDates.length === 2).length),
            new Metric('3 Or More Snoozes', data.filter(i => i.snoozeDates && i.snoozeDates.length >= 3).length),

        ];

        console.log(metrics);

        donut.generateChart(metrics);
    });




})();