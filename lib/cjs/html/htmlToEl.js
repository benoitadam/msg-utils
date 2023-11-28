"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlToEl = void 0;
const htmlToEl = (html) => {
    const el = document.createElement('div');
    el.innerHTML = html;
    return el.children[0];
};
exports.htmlToEl = htmlToEl;
