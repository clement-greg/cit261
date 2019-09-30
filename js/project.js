
// Don't pollute the global namespace
(function () {

    function Utilities() { }

    Utilities.newid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function DOMUpdator() { }
    DOMUpdator.prototype.updateTime = function (displayTime) {
        let ampm = 'AM';
        let hours = displayTime.getHours();
        let minutes = displayTime.getMinutes();
        let seconds = displayTime.getSeconds();

        if (hours === 12) {
            ampm = 'PM'
        } else if (hours > 12) {
            ampm = 'PM';
            hours -= 12;
        }

        if (minutes.toString().length === 1) {
            minutes = '0' + minutes;
        }
        if (seconds.toString().length === 1) {
            seconds = '0' + seconds;
        }
        document.getElementById('time').innerHTML = hours + ':' + minutes + ':' + seconds + ' ' + ampm;

        let minuteHand = document.getElementById('minute-hand');
        let hourHand = document.getElementById('hour-hand');

        let currentMinutes = displayTime.getMinutes() + (displayTime.getSeconds() / 60);
        let currentHours = displayTime.getHours() + (currentMinutes / 60);

        minuteHand.style.transform = 'rotate(' + (currentMinutes * 6) + 'deg)';
        hourHand.style.transform = 'rotate(' + (currentHours * 30) + 'deg)';
    }

    DOMUpdator.prototype.playAlarm = function (alarm) {
        console.log('playing alarm: ' + alarm.name);
        document.getElementById('wakeUpVideo').style.display = 'initial';
        document.getElementById('stop-alarm').style.visibility = 'initial';
        document.getElementById('edit-alarms').style.display = 'none';
        document.getElementById('stop-alarm').classList.add('expand');

        setTimeout(function () {
            document.getElementById('stop-alarm').classList.remove('expand');
            document.getElementById('stop-alarm').classList.add('pulsate-button');
        }, 5000);

        wakeUpVideo.play();
        wakeUpSound.play();
    };

    DOMUpdator.prototype.stopAlarm = function () {
        document.getElementById('wakeUpVideo').style.display = 'none';
        document.getElementById('stop-alarm').style.visibility = 'collapse';
        document.getElementById('edit-alarms').style.display = 'block';
        document.getElementById('stop-alarm').classList.remove('expand');
        document.getElementById('stop-alarm').classList.remove('pulsate-button');
        wakeUpVideo.pause();
        wakeUpSound.pause();
    }

    // JavaScript Object - Object Creation function (aka the object constructor)
    function Alarm(name, hour, minute, sundayActive, mondayActive, tuesdayActive, wednesdayActive, thursdayActive, fridayActive, saturdayActive) {

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

        this.satSelected = function () { if (this.saturdayActive) { return 'selected'; } }

        this.friSelected = function () { if (this.fridayActive) { return 'selected'; } }

        this.thuSelected = function () { if (this.thursdayActive) { return 'selected'; } }

        this.wedSelected = function () { if (this.wednesdayActive) { return 'selected'; } }

        this.tueSelected = function () { if (this.tuesdayActive) { return 'selected'; } }

        this.monSelected = function () { if (this.mondayActive) { return 'selected'; } }

        this.sunSelected = function () { if (this.sundayActive) { return 'selected'; } }

        this.hourDisplay = function () {
            if (this.hour > 12) {
                return this.hour - 12;
            } else {
                return this.hour;
            }
        }

        this.minuteDisplay = function () {
            return this.minute.toString().length === 1 ? '0' + this.minute.toString() : this.minute.toString();
        }

        this.ampm = function () {
            return this.hour >= 12 ? 'pm' : 'am';
        }
    }

    Alarm.prototype.checkAlarm = function () {
        let now = new Date();
        if (this.alarmRinging) {
            return false;
        }

        let isTimeToRing = now.getHours() === this.hour && now.getMinutes() == this.minute;
        if (!isTimeToRing) {
            this.alarmRinging = false;
        }

        return isTimeToRing;
    }

    Alarm.prototype.startAlarm = function () {
        this.alarmRinging = true;
    }

    Alarm.prototype.snooze = function () {
        this.alarmRinging = false;
        let testDate = new Date();
        testDate.setHours(this.hour);
        testDate.setMinutes(this.minute + 10);

        this.hour = testDate.getHours();
        this.minute = testDate.getMinutes();
    }

    Alarm.prototype.stop = function () {
        this.alarmRinging = false;
    }

    // JavaScript Objects - Inheritance
    function WeekdayAlarm(name, hour, minute) {
        Alarm.call(this, name, hour, minute, false, true, true, true, true, true, false);
    }
    WeekdayAlarm.prototype = Object.create(Alarm.prototype);

    //JavaScript Objects - Inheritance
    function WeekendAlarm(name, hour, minute) {
        Alarm.call(this, name, hour, minute, true, false, false, false, false, false, true);
    }
    WeekendAlarm.prototype = Object.create(Alarm.prototype);



    function Clock() {
        this.alarms = [];
        this.domUpdator = new DOMUpdator();
        this.localStorage = new LocalStorageHelper(this);

        this.alarms = this.localStorage.getAlarms();

        this.saveAlarms = function () { this.localStorage.saveAlarms(); }
    }

    function LocalStorageHelper(clock) {
        let alarmConfigKey = 'alarm-config';
        this.saveAlarms = function () {
            localStorage.setItem(alarmConfigKey, JSON.stringify(clock.alarms));
        }

        this.getAlarms = function () {
            if (localStorage.getItem) {
                try {

                    var alarmsRaw = JSON.parse(localStorage.getItem(alarmConfigKey));
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

    Clock.prototype.start = function () {
        let thisObject = this;

        this.interval = setInterval(function () {
            thisObject.domUpdator.updateTime(new Date());
            if (!thisObject.alarms) {
                thisObject.alarms = [];
            }

            for (let alarm of thisObject.alarms) {
                if (alarm.checkAlarm()) {
                    alarm.startAlarm();
                    thisObject.domUpdator.playAlarm(alarm);
                }
            }
        }, 500);
    };

    Clock.prototype.addAlarm = function (alarm) {
        this.alarms.push(alarm);
        this.saveAlarms();
    }

    // JavaScript Object - Object Creation
    let clock = new Clock();

    clock.start();

    function ModalHelper() {
        let thisItem = this;
        let editedAlarm = null;
        this.showModal = function () {
            renderAlarmElements();
            document.getElementById('modal').classList.add('show');
            document.getElementById('modal-backdrop').classList.add('show');
        }

        this.hideModal = function () {
            document.getElementById('modal').classList.remove('show');
            document.getElementById('modal-backdrop').classList.remove('show');
            document.getElementById('tab-container').classList.remove('tab2');
        }

        this.addNewAlarm = function () {

            let newAlarm = new WeekdayAlarm('Morning', 8, 0);
            clock.addAlarm(newAlarm);
            renderAlarmElements(newAlarm);
        }

        this.editAlarm = function (alarm) {

            editedAlarm = alarm;

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

        this.saveAlarm = function () {
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

            renderAlarmElements();
            document.getElementById('tab-container').classList.remove('tab2');
            editedAlarm.alarmRinging = false;
            clock.saveAlarms();
            console.log(editedAlarm);
            console.log(clock.alarms);
        }

        this.closeEdit = function () {
            document.getElementById('tab-container').classList.remove('tab2');
        }

        function renderAlarmElements(newAlarm) {
            let alarmItemContainer = document.getElementById('alarm-item-container');

            var child = alarmItemContainer.lastElementChild;
            while (child) {
                // DOM Manipulation - removeChild
                alarmItemContainer.removeChild(child);
                child = alarmItemContainer.lastElementChild;
            }

            if (clock.alarms.length) {
                for (let alarm of clock.alarms) {

                    let alarmTemplate = document.getElementById('alarm-item').innerHTML;
                    for (key in alarm) {
                        let regEx = new RegExp('{{' + key + '}}', 'g');

                        if (typeof alarm[key] === 'function' && alarmTemplate.indexOf('{{' + key + '}}') > -1) {
                            alarmTemplate = alarmTemplate.replace(regEx, alarm[key]());
                        } else {
                            alarmTemplate = alarmTemplate.replace(regEx, alarm[key]);
                        }
                    }

                    // DOM Manipulation - createElement
                    const alarmDiv = document.createElement('div');
                    alarmDiv.innerHTML = alarmTemplate;
                    if (newAlarm && newAlarm === alarm) {
                        alarmDiv.classList.add('expand');
                    }

                    // DOM Manipulation - appendChild
                    document.getElementById('alarm-item-container').appendChild(alarmDiv);
                }

                for (let button of document.getElementsByClassName('delete-alarm-button')) {
                    button.addEventListener('click', function () {
                        let alarmId = this.getAttribute('data-alarmid');
                        let alarmToRemove = clock.alarms.find(i => i.id === alarmId);
                        let parentDiv = document.getElementById('parent' + alarmId);
                        parentDiv.classList.add('collapse');

                        setTimeout(function () {
                            clock.alarms.splice(clock.alarms.indexOf(alarmToRemove), 1);
                            renderAlarmElements();
                            clock.saveAlarms();
                        }, 400);

                    });
                }
                for (let button of document.getElementsByClassName('edit-alarm-button')) {
                    button.addEventListener('click', function () {
                        let alarmId = this.getAttribute('data-alarmid');
                        let alarmToEdit = clock.alarms.find(i => i.id === alarmId);


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


    let myModalHelper = new ModalHelper();

    function wireUpEventHandlers() {
        document.getElementById('edit-alarms').addEventListener('click', function () {
            myModalHelper.showModal();
        });

        document.getElementById('close-modal').addEventListener('click', function () {
            myModalHelper.hideModal();
        });

        document.getElementById('modal-backdrop').addEventListener('click', function () {
            myModalHelper.hideModal();
        });
        document.getElementById('stop-alarm').addEventListener('click', function () {
            clock.domUpdator.stopAlarm();
        });

        document.getElementById('add-alarm').addEventListener('click', function () {
            myModalHelper.addNewAlarm();
        });

        document.getElementById('save-alarm').addEventListener('click', function () {
            myModalHelper.saveAlarm();
        });

        document.getElementById('cancel-edit').addEventListener('click', function () {
            myModalHelper.closeEdit();
        });
    }



    wireUpEventHandlers();
})();