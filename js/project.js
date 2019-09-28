
// Don't pollute the global namespace
(function () {

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
        // TODO: create visualizations and play sounds to play the alarm

        console.log('playing alarm: ' + alarm.name);
        document.getElementById('wakeUpVideo').style.display = 'initial';
        document.getElementById('stop-alarm').style.visibility = 'initial';
        wakeUpVideo.play();
        wakeUpSound.play();
    };

    DOMUpdator.prototype.stopAlarm = function() {
        document.getElementById('wakeUpVideo').style.display = 'none';
        document.getElementById('stop-alarm').style.visibility = 'collapse';
        wakeUpVideo.pause();
        wakeUpSound.pause();
    }

    DOMUpdator.prototype.showAlarms = function (alarms) {

    }

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

        alarmRinging = false;
    }

    Alarm.prototype.checkAlarm = function () {
        let now = new Date();
        if (this.alarmRinging) {
            return false;
        }

        return now.getHours() === this.hour && now.getMinutes() == this.minute;
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

    function WeekdayAlarm(name, hour, minute) {
        Alarm.call(this, name, hour, minute, false, true, true, true, true, true, false);
    }

    WeekdayAlarm.prototype = Object.create(Alarm.prototype);

    function WeekendAlarm(name, hour, minute) {
        Alarm.call(this, name, hour, minute, true, false, false, false, false, false, true);
    }

    WeekendAlarm.prototype = Object.create(Alarm.prototype);



    function Clock() {
        this.alarms = [];
        this.domUpdator = new DOMUpdator();
    }

    Clock.prototype.start = function () {
        let thisObject = this;

        this.interval = setInterval(function () {
            thisObject.domUpdator.updateTime(new Date());
            for (let alarm of thisObject.alarms) {
                if (alarm.checkAlarm()) {
                    alarm.startAlarm();
                    thisObject.domUpdator.playAlarm(alarm);
                }
            }
        }, 200);
    };

    Clock.prototype.addAlarm = function (alarm) {
        this.alarms.push(alarm);
        console.log(this);
    }

    let clock = new Clock();

    clock.start();

    let now = new Date();
    clock.addAlarm(new WeekdayAlarm('Morning', now.getHours(), now.getMinutes() + 0));

    function ModalHelper() {
        this.showModal = function () {
            console.log('showing modal');
            document.getElementById('modal').classList.add('show');
            document.getElementById('modal-backdrop').classList.add('show');
        }

        this.hideModal = function () {
            document.getElementById('modal').classList.remove('show');
            document.getElementById('modal-backdrop').classList.remove('show');
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
        document.getElementById('stop-alarm').addEventListener('click', function() {
            clock.domUpdator.stopAlarm();
        });
    }

    wireUpEventHandlers();

    // setTimeout(function() {
    //     wakeUpVideo.play();

    // }, 2000);


})();