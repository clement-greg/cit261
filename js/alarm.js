import { Utilities } from './utilities.js';
export class Alarm {
    constructor(name, hour, minute, sundayActive, mondayActive, tuesdayActive, wednesdayActive, thursdayActive, fridayActive, saturdayActive) {
        this.name = name;
        this.hour = hour;
        this.minute = minute;
        this.sundayActive = sundayActive;
        this.mondayActive = mondayActive;
        this.tuesdayActive = tuesdayActive;
        this.wednesdayActive = wednesdayActive;
        this.thursdayActive = thursdayActive;
        this.fridayActive = fridayActive;
        this.saturdayActive = saturdayActive;
        this.id = Utilities.newid();
        this.alarmRinging = false;
    }

    get satSelected() { if (this.saturdayActive) { return 'selected'; } }

    get friSelected() { if (this.fridayActive) { return 'selected'; } }

    get thuSelected() { if (this.thursdayActive) { return 'selected'; } }

    get wedSelected() { if (this.wednesdayActive) { return 'selected'; } }

    get tueSelected() { if (this.tuesdayActive) { return 'selected'; } }

    get monSelected() { if (this.mondayActive) { return 'selected'; } }

    get sunSelected() { if (this.sundayActive) { return 'selected'; } }

    get hourDisplay() {
        if (this.hour > 12) {
            return this.hour - 12;
        } else {
            return this.hour;
        }
    }

    minuteDisplay() {
        return this.minute.toString().length === 1 ? '0' + this.minute.toString() : this.minute.toString();
    }

    ampm() {
        return this.hour >= 12 ? 'pm' : 'am';
    }

    checkAlarm() {
        let now = new Date();
        if (this.alarmRinging) {
            return false;
        }

        let isTimeToRing = now.getHours() === this.hour && now.getMinutes() == this.minute;

        
        const day = now.getDay();

        if (day === 0 && !this.sundayActive) {
            isTimeToRing = false;
        } else if (day === 1 && !this.mondayActive) {
            isTimeToRing = false;
        } else if (day === 2 && !this.tuesdayActive) {
            isTimeToRing = false;
        } else if (day === 3 && !this.wednesdayActive) {
            isTimeToRing = false;
        } else if (day === 4 && !this.thursdayActive) {
            isTimeToRing = false;
        } else if (day === 5 && !this.fridayActive) {
            isTimeToRing = false;
        } else if (day === 6 && !this.saturdayActive) {
            isTimeToRing = false;
        }

        if (!isTimeToRing) {
            this.alarmRinging = false;
        }

        return isTimeToRing;
    }

    startAlarm() {
        this.alarmRinging = true;
    }

    snooze() {
        this.alarmRinging = false;
        let testDate = new Date();
        testDate.setHours(this.hour);
        testDate.setMinutes(this.minute + 10);

        this.hour = testDate.getHours();
        this.minute = testDate.getMinutes();
    }

    stop() {
        this.alarmRinging = false;
    }
}

// Object Inheritance
export class WeekdayAlarm extends Alarm {
    constructor(name, hour, minute) {
        super(name, hour, minute, false, true, true, true, true, true, false);
    }
}

// Object Inheritance
export class WeekendAlarm extends Alarm {
    constructor(name, hour, minute) {
        super(name, hour, minute, true, false, false, false, false, false, true);
    }
}