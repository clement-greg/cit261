export class Utilities {

    static newid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static clearDOMChildren(id) {
        let parentContainer = document.getElementById(id);

        var child = parentContainer.lastElementChild;
        while (child) {
            // DOM Manipulation - removeChild
            parentContainer.removeChild(child);
            child = parentContainer.lastElementChild;
        }
    }

    static replaceStringWithObject(source, replacementObject, prototype) {
        for (let key in replacementObject) {
            let regEx = new RegExp('{{' + key + '}}', 'g');

            if (typeof replacementObject[key] === 'function' && source.indexOf('{{' + key + '}}') > -1) {
                source = source.replace(regEx, replacementObject[key]());
            } else {
                source = source.replace(regEx, replacementObject[key]);
            }
        }
        
        for (let key of Object.getOwnPropertyNames(prototype)) {
            let regEx = new RegExp('{{' + key + '}}', 'g');

            if (typeof replacementObject[key] === 'function' && source.indexOf('{{' + key + '}}') > -1) {
                source = source.replace(regEx, replacementObject[key]());
            } else {
                source = source.replace(regEx, replacementObject[key]);
            }
        }

        return source;

    }

    static swipeDetect(el, callback) {
        let dist = 0;
        function touchStart(e) {
            var touchObj = e.changedTouches[0];
            swipeDir = 'none';
            dist = 0;
            startX = touchObj.pageX;
            startY = touchObj.pageY;
            startTime = new Date().getTime();
        }

        function touchEnd(e) {
            var touchObj = e.changedTouches[0]
            distX = touchObj.pageX - startX;
            distY = touchObj.pageY - startY;
            elapsedTime = new Date().getTime() - startTime;
            if (elapsedTime <= allowedTime) {
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                    swipeDir = (distX < 0) ? 'left' : 'right';
                }
                else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
                    swipeDir = (distY < 0) ? 'up' : 'down';
                }
            }
            if (swipeDir !== 'none') {
                handleSwipe(swipeDir);
            }
        }

        var touchSurface = el,
            swipeDir,
            startX,
            startY,
            distX,
            distY,
            threshold = 150,
            restraint = 100,
            allowedTime = 300,
            elapsedTime,
            startTime,
            handleSwipe = callback || function (swipeDir) { }

        // HTML 5 Touch events
        touchSurface.removeEventListener('touchstart', touchStart);
        touchSurface.addEventListener('touchstart', touchStart, true);
        touchSurface.removeEventListener('touchend', touchEnd);
        touchSurface.addEventListener('touchend', touchEnd, true);
    }
}