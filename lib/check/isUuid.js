"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUuid = void 0;
const isUuid = (value) => {
    const code = String(value).replace(/[a-zA-Z0-9]+/g, (a) => '' + a.length);
    return code === '8-4-4-4-12' || code === '32';
};
exports.isUuid = isUuid;
