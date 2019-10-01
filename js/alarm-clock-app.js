import { Clock } from './clock.js';
import { AlarmEditor } from './alarm-editor.js';

// Don't pollute the global namespace
(function () {
    // JavaScript Object - Object Creation
    const clock = new Clock();
    clock.start();

    new AlarmEditor(clock);
})();