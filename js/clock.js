import { LocalStorageHelper } from './local-storage-helper.js';
import { Utilities } from './utilities.js';
import { DOMUpdater } from './dom-updater.js';
import { showSnackBar } from './snack-bar.js';

export class Clock {
    // alarms = [];
    // localStorage;

    constructor() {
        this.localStorage = new LocalStorageHelper(this);
        this.alarms = this.localStorage.getAlarms();

        document.getElementById('stop-alarm').addEventListener('click', function () {
            DOMUpdater.stopAlarm();
        });

        document.getElementById('view-stats').addEventListener('click', () => {

            document.getElementById('main-tab-container').classList.add('tab2');
        });

        document.getElementById('go-home-button').addEventListener('click', () => {
            document.getElementById('main-tab-container').classList.remove('tab2');
        });
    }

    saveAlarms() { this.localStorage.saveAlarms(); }

    setupSwipeHandler() {
        Utilities.swipeDetect(document, (swipeDir) => {
            if (swipeDir === 'up') {
                this.activeAlarm = null;
                DOMUpdater.stopAlarm();
            }
            if (swipeDir === 'down' && this.activeAlarm) {
                this.activeAlarm.snooze();
                DOMUpdater.stopAlarm();
                this.activeAlarm = null;
                showSnackBar('Alarm Snoozed');
            }
            if (swipeDir === 'right') {
                document.getElementById('main-tab-container').classList.remove('tab2');
            }
            if (swipeDir === 'left') {
                document.getElementById('main-tab-container').classList.add('tab2');
            }
        });
    }

    start() {
        let thisItem = this;
        let thisObject = this;

        this.interval = setInterval(() => {
            DOMUpdater.updateTime(new Date());
            if (!thisObject.alarms) {
                thisObject.alarms = [];
            }

            for (let alarm of thisObject.alarms) {
                if (alarm.checkAlarm()) {
                    alarm.startAlarm();
                    thisItem.activeAlarm = alarm;

                    DOMUpdater.playAlarm(alarm);
                }
            }
        }, 500);

        this.setupSwipeHandler();
    }

    addAlarm(alarm) {
        this.alarms.push(alarm);
        this.saveAlarms();
    }
}