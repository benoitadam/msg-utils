"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTimeout = void 0;
const TimeoutError_1 = require("./TimeoutError");
const withTimeout = (promise, timeoutMs = 5000) => {
    return new Promise((resolve, reject) => {
        const t = setTimeout(() => reject(new TimeoutError_1.TimeoutError()), timeoutMs);
        promise
            .then(resolve)
            .catch(reject)
            .finally(() => clearTimeout(t));
    });
};
exports.withTimeout = withTimeout;
