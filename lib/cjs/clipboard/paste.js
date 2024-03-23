"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paste = void 0;
const parseJson_1 = require("../json/parseJson");
const storage_1 = require("../storage/storage");
const paste = async () => {
    try {
        const json = await navigator.clipboard.readText();
        return (0, parseJson_1.parseJson)(json, json);
    }
    catch (e) {
        return Promise.resolve(storage_1.storage.get('__copy'));
    }
};
exports.paste = paste;
