import { Alarm } from './alarm.js';
export class LocalStorageHelper {
    constructor(clock) {
        this.clock = clock;
        this.alarmConfigKey = 'alarm-config';
    }

    saveAlarms() {
        // LocalStorage - setItem
        // JSON.stringify
        localStorage.setItem(this.alarmConfigKey, JSON.stringify(this.clock.alarms));
    }

    getAlarms() {
        if (localStorage.getItem(this.alarmConfigKey)) {
            try {

                // LocalStorage - getItem
                //JSON.parse
                var alarmsRaw = JSON.parse(localStorage.getItem(this.alarmConfigKey));
                let results = [];

                for (let alarm of alarmsRaw) {
                    let alarmObj = new Alarm();

                    for (let key in alarm) {
                        alarmObj[key] = alarm[key];
                    }
                    results.push(alarmObj);
                }
                return results;
            } catch (e) {
                return [];
            }
        } else {
            return [];
        }
    }
}