"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEl = void 0;
const addEl = (containerEl, ...els) => {
    for (const el of els)
        el && containerEl.appendChild(el);
};
exports.addEl = addEl;
