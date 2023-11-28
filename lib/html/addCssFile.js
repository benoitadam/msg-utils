"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCssFile = void 0;
const map = {};
const addCssFile = (url) => {
    if (map[url])
        return map[url];
    const el = document.createElement('link');
    el.rel = 'stylesheet';
    el.type = 'text/css';
    el.href = url;
    map[url] = document.head.appendChild(el);
    return el;
};
exports.addCssFile = addCssFile;
