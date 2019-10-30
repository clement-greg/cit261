import { WeekdayAlarm, Alarm } from './alarm.js';
import { Utilities } from './utilities.js';

export class AlarmEditor {

    constructor(clock) {
        this.clock = clock;

        // Wire up modal button event handlers
        document.getElementById('edit-alarms').addEventListener('click', () => { this.showModal(); });
        document.getElementById('close-modal').addEventListener('click', () => { this.hideModal(); });
        document.getElementById('modal-backdrop').addEventListener('click', () => { this.hideModal(); });
        document.getElementById('add-alarm').addEventListener('click', () => { this.addNewAlarm(); });
        document.getElementById('save-alarm').addEventListener('click', () => { this.saveAlarm(); });
        document.getElementById('cancel-edit').addEventListener('click', () => { this.closeEdit(); });
    }

    showModal() {
        this.renderAlarmElements();
        document.getElementById('modal').classList.add('show');
        document.getElementById('modal-backdrop').classList.add('show');
    }

    hideModal() {
        document.getElementById('modal').classList.remove('show');
        document.getElementById('modal-backdrop').classList.remove('show');
        document.getElementById('tab-container').classList.remove('tab2');
    }

    addNewAlarm() {
        let newAlarm = new WeekdayAlarm('Morning', 8, 0);
        this.clock.addAlarm(newAlarm);
        this.renderAlarmElements(newAlarm);
    }

    editAlarm(alarm) {
        this.editedAlarm = alarm;
        document.getElementById('tab-container').classList.add('tab2');
        document.getElementById('alarm-name').value = alarm.name;
        document.getElementById('alarm-hour').value = alarm.hour;
        document.getElementById('alarm-minute').value = alarm.minute;
        document.getElementById('isSunday').checked = alarm.sundayActive;
        document.getElementById('isMonday').checked = alarm.mondayActive;
        document.getElementById('isTuesday').checked = alarm.tuesdayActive;
        document.getElementById('isWednesday').checked = alarm.wednesdayActive;
        document.getElementById('isThursday').checked = alarm.thursdayActive;
        document.getElementById('isFriday').checked = alarm.fridayActive;
        document.getElementById('isSaturday').checked = alarm.saturdayActive;
    }

    saveAlarm() {
        const editedAlarm = this.editedAlarm;
        editedAlarm.name = document.getElementById('alarm-name').value;
        editedAlarm.hour = parseInt(document.getElementById('alarm-hour').value);
        editedAlarm.minute = parseInt(document.getElementById('alarm-minute').value);


        editedAlarm.sundayActive = document.getElementById('isSunday').checked;
        editedAlarm.mondayActive = document.getElementById('isMonday').checked;
        editedAlarm.tuesdayActive = document.getElementById('isTuesday').checked;
        editedAlarm.wednesdayActive = document.getElementById('isWednesday').checked;
        editedAlarm.thursdayActive = document.getElementById('isThursday').checked;
        editedAlarm.fridayActive = document.getElementById('isFriday').checked;
        editedAlarm.saturdayActive = document.getElementById('isSaturday').checked;

        this.renderAlarmElements();
        document.getElementById('tab-container').classList.remove('tab2');
        editedAlarm.alarmRinging = false;
        this.clock.saveAlarms();
    }

    closeEdit() {
        document.getElementById('tab-container').classList.remove('tab2');
    }

    renderAlarmElements(newAlarm) {

        Utilities.clearDOMChildren('alarm-item-container');

        if (this.clock.alarms.length) {
            for (let alarm of this.clock.alarms) {
                let alarmTemplate = document.getElementById('alarm-item').innerHTML;

                alarmTemplate = Utilities.replaceStringWithObject(alarmTemplate, alarm, Alarm.prototype);

                // DOM Manipulation - createElement
                const alarmDiv = document.createElement('div');
                alarmDiv.innerHTML = alarmTemplate;
                if (newAlarm && newAlarm === alarm) {
                    alarmDiv.classList.add('expand');
                }

                // DOM Manipulation - appendChild
                document.getElementById('alarm-item-container').appendChild(alarmDiv);
            }


            const thisItem = this;
            for (let button of document.getElementsByClassName('delete-alarm-button')) {
                //button.addEventListener('click', () => alert('fires'));
                button.addEventListener('click', function () {
                    let alarmId = this.getAttribute('data-alarmid');
                    let alarmToRemove = thisItem.clock.alarms.find(i => i.id === alarmId);
                    let parentDiv = document.getElementById('parent' + alarmId);
                    parentDiv.classList.add('collapse');

                    setTimeout(() => {
                        thisItem.clock.alarms.splice(thisItem.clock.alarms.indexOf(alarmToRemove), 1);
                        thisItem.renderAlarmElements();
                        thisItem.clock.saveAlarms();
                    }, 400);

                });
            }
            for (let button of document.getElementsByClassName('edit-alarm-button')) {
                button.addEventListener('click', function () {
                    let alarmId = this.getAttribute('data-alarmid');
                    let alarmToEdit = thisItem.clock.alarms.find(i => i.id === alarmId);

                    thisItem.editAlarm(alarmToEdit);
                });
            }
        } else {
            let noAlarmsTemplate = document.getElementById('no-alarms').innerHTML;
            const alarmDiv = document.createElement('div');
            alarmDiv.innerHTML = noAlarmsTemplate;

            document.getElementById('alarm-item-container').appendChild(alarmDiv);
        }
    }
}