"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setStyle = void 0;
const __1 = require("..");
const setStyle = (el, style, update) => {
    if (typeof style === 'string')
        return (0, __1.setAttrs)(el, { style }, true);
    if (!update)
        (0, __1.setAttrs)(el, { style: '' }, true);
    Object.assign(el.style, style);
};
exports.setStyle = setStyle;
