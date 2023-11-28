"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = void 0;
const retry = async (createPromise, retry = 2) => {
    let error;
    for (let i = 0; i < retry; i++) {
        try {
            return await createPromise();
        }
        catch (e) {
            error = e;
        }
    }
    throw error;
};
exports.retry = retry;
