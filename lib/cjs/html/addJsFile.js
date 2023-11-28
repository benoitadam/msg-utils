"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addJsFile = void 0;
const map = {};
const addJsFile = (url) => {
    if (map[url])
        return map[url];
    const el = document.createElement('script');
    el.type = 'text/javascript';
    el.async = true;
    el.src = url;
    map[url] = document.head.appendChild(el);
    return el;
};
exports.addJsFile = addJsFile;
