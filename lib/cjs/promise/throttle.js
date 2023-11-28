"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = void 0;
/**
 * @example
 * a b c d - - - - e - f g - -
 * a - c - d - - - e - f - g - (2s)
 * a - - d - - - - e - - g - - (3s)
 * a - - - d - - - e - - - g - (4s)
 */
const throttle = (fn, ms) => {
    let lastTime = 0, lastValue, timer;
    const update = () => {
        timer = null;
        fn(lastValue);
        lastTime = Date.now();
    };
    return (value) => {
        lastValue = value;
        if (timer)
            clearTimeout(timer);
        const nextCall = Math.max(ms - (Date.now() - lastTime), 0);
        if (nextCall === 0)
            update();
        else
            timer = setTimeout(update, nextCall);
    };
};
exports.throttle = throttle;
