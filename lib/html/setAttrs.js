"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAttrs = void 0;
const setAttrs = (el, attrs, update) => {
    if (!update)
        for (const a of el.attributes)
            el.removeAttribute(a.name);
    for (const n in attrs)
        el.setAttribute(n, attrs[n]);
};
exports.setAttrs = setAttrs;
