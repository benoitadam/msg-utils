"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCss = void 0;
const map = {};
const setCss = (key, css) => {
    const old = map[key];
    if (old) {
        if (old.css === css)
            return;
        old.el.remove();
        delete map[key];
    }
    if (css) {
        const el = document.createElement('style');
        el.textContent = css;
        document.head.appendChild(el);
        map[key] = { el, css };
    }
};
exports.setCss = setCss;
