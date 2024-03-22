"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJson = void 0;
const isNotNull_1 = require("../check/isNotNull");
const tryCatch_1 = require("../cast/tryCatch");
exports.parseJson = ((v, def) => (0, tryCatch_1.tryCatch)(() => ((0, isNotNull_1.isNotNull)(v) ? JSON.parse(v) : def), def));
