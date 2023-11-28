"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCls = void 0;
const setCls = (el, cls, update) => {
    if (typeof cls === 'string') {
        el.className = cls;
        return;
    }
    if (!update)
        el.className = '';
    const list = el.classList;
    for (const name in cls) {
        const isAdd = cls[name];
        isAdd ? list.add(name) : list.remove(name);
    }
};
exports.setCls = setCls;
