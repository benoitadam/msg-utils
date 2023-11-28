"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paste = void 0;
const parseJson_1 = require("../json/parseJson");
const storage_1 = require("../storage/storage");
const paste = () => {
    if (navigator && navigator.clipboard) {
        return navigator.clipboard
            .readText()
            .then((v) => (0, parseJson_1.parseJson)(v, v))
            .catch(() => storage_1.storage.get('__copy'));
    }
    return Promise.resolve(storage_1.storage.get('__copy'));
};
exports.paste = paste;
