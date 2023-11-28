"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSiteTitle = void 0;
const setSiteTitle = (title) => {
    const titleEl = document.getElementsByTagName('title')[0];
    if (titleEl)
        titleEl.innerText = title;
    document.title = title;
};
exports.setSiteTitle = setSiteTitle;
