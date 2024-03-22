"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setStyle = void 0;
const setAttrs_1 = require("./setAttrs");
const setStyle = (el, style, update) => {
    if (typeof style === 'string')
        return (0, setAttrs_1.setAttrs)(el, { style }, true);
    if (!update)
        (0, setAttrs_1.setAttrs)(el, { style: '' }, true);
    Object.assign(el.style, style);
};
exports.setStyle = setStyle;
