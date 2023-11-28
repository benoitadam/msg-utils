"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
/**
 * @example
 * a b c - - - d - - e - -
 * - - - - c - - - d - - e
 */
const debounce = (fn, ms) => {
    let timer, lastValue;
    const update = () => {
        timer = null;
        fn(lastValue);
    };
    return (value) => {
        lastValue = value;
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(update, ms);
    };
};
exports.debounce = debounce;
