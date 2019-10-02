import { Clock } from './clock.js';
import { AlarmEditor } from './alarm-editor.js';
import { showSnackBar } from './snack-bar.js';
import { Utilities } from './utilities.js';
import { Statistics } from './statistics.js';
import { DOMUpdater } from './dom-updater.js';

// Don't pollute the global namespace
(function () {
    // JavaScript Object - Object Creation
    const clock = new Clock();
    clock.start();

    new AlarmEditor(clock);

    const stats = new Statistics();
    

    function setupSwipeHandler() {
        Utilities.swipeDetect(document, (swipeDir) => {
            if (swipeDir === 'up') {
                clock.activeAlarm = null;
                DOMUpdater.stopAlarm();
            }
            if (swipeDir === 'down' && clock.activeAlarm) {
                clock.activeAlarm.snooze();
                DOMUpdater.stopAlarm();
                clock.activeAlarm = null;
                showSnackBar('Alarm Snoozed');
            }
            if (swipeDir === 'right') {
                document.getElementById('main-tab-container').classList.remove('tab2');
            }
            if (swipeDir === 'left') {
                document.getElementById('main-tab-container').classList.add('tab2');
                stats.generateStatistics();
            }
        });
    }

    setupSwipeHandler();
})();