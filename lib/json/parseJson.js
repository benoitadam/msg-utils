"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJson = void 0;
const tryCatch_1 = require("../cast/tryCatch");
exports.parseJson = ((v, def) => (0, tryCatch_1.tryCatch)(() => JSON.parse(v), def));
