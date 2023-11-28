"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatch = void 0;
exports.tryCatch = ((fun, def) => {
    try {
        return fun();
    }
    catch (error) {
        return def;
    }
});
