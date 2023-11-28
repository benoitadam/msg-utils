"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addListener = void 0;
const addListener = (element, type, listener, options) => {
    const el = element === 0 ? document.body : element;
    el.addEventListener(type, listener, options);
    return () => el.removeEventListener(type, listener);
};
exports.addListener = addListener;
