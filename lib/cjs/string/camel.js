"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camel = void 0;
const firstLower_1 = require("./firstLower");
const pascal_1 = require("./pascal");
const camel = (arg) => (0, firstLower_1.firstLower)((0, pascal_1.pascal)(arg));
exports.camel = camel;
