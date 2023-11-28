"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toError = void 0;
const toError = (error) => error instanceof Error ? error : new Error(String(error));
exports.toError = toError;
