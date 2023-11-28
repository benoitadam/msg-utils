"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setEl = void 0;
const setAttrs_1 = require("./setAttrs");
const setStyle_1 = require("./setStyle");
const setCls_1 = require("./setCls");
const setEl = (el, options) => {
    if (typeof el === 'string')
        el = document.createElement(el);
    if (!options)
        return el;
    const { reset, attrs, style, cls, children, ...rest } = options;
    if (reset)
        (0, setAttrs_1.setAttrs)(el, {});
    if (attrs)
        (0, setAttrs_1.setAttrs)(el, attrs, true);
    if (style)
        (0, setStyle_1.setStyle)(el, style, true);
    if (cls)
        (0, setCls_1.setCls)(el, cls, true);
    Object.assign(el, rest);
    if (children)
        for (const childEl of children)
            el.appendChild(childEl);
    return el;
};
exports.setEl = setEl;
