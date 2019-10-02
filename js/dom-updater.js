export class DOMUpdater {
    static updateTime (displayTime) {
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

        // Manipulating CSS Class Properties Using JavaScript
        minuteHand.style.transform = 'rotate(' + (currentMinutes * 6) + 'deg)';
        hourHand.style.transform = 'rotate(' + (currentHours * 30) + 'deg)';
    }

    static playAlarm  (alarm) {
        // Manipulating CSS Class Properties Using JavaScript
        document.getElementById('wakeUpVideo').style.display = 'initial';
        document.getElementById('stop-alarm').style.visibility = 'initial';
        document.getElementById('stop-alarm').style.display = 'block';
        document.getElementById('edit-alarms').style.display = 'none';
        document.getElementById('stop-alarm').classList.add('expand');
        document.getElementById('stop-alarm').classList.remove('pulsate-button');

        setTimeout(function () {
            document.getElementById('stop-alarm').classList.remove('expand');
            document.getElementById('stop-alarm').classList.add('pulsate-button');
            
        }, 5000);

        wakeUpVideo.currentTime = 0;
        wakeUpSound.currentTime = 0;

        wakeUpVideo.play();
        wakeUpSound.play();
    };

    static stopAlarm () {
        document.getElementById('wakeUpVideo').style.display = 'none';
        document.getElementById('stop-alarm').style.visibility = 'collapse';
        document.getElementById('edit-alarms').style.display = 'block';
        document.getElementById('stop-alarm').classList.remove('expand');
        document.getElementById('stop-alarm').classList.remove('pulsate-button');
        document.getElementById('stop-alarm').style.display = 'none';
        wakeUpVideo.pause();
        wakeUpSound.pause();
    }
}