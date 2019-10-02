import { LocalStorageHelper } from './local-storage-helper.js';
import { DOMUpdater } from './dom-updater.js';

export class Clock {
    constructor() {
        this.localStorage = new LocalStorageHelper(this);
        this.alarms = this.localStorage.getAlarms();

        document.getElementById('stop-alarm').addEventListener('click', function () {
            DOMUpdater.stopAlarm();
        });
    }

    saveAlarms() { this.localStorage.saveAlarms(); }

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
    }

    addAlarm(alarm) {
        this.alarms.push(alarm);
        this.saveAlarms();
    }
}