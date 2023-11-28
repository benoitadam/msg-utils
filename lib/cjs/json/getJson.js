"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJson = void 0;
const tryCatch_1 = require("../cast/tryCatch");
exports.getJson = ((v, def, indented) => (0, tryCatch_1.tryCatch)(() => JSON.stringify(v, null, indented ? 2 : 0), def));
