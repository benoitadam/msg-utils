"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toClassName = void 0;
const toClassName = (obj) => {
    if (!obj)
        return '';
    const constructor = Object.getPrototypeOf(obj).constructor;
    if (constructor instanceof Function)
        return obj.name || 'Function';
    return constructor.name;
};
exports.toClassName = toClassName;
