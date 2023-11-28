"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clean = void 0;
const clean = (arg) => arg
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w]/g, ' ')
    .trim();
exports.clean = clean;
