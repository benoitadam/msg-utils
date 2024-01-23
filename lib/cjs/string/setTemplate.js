"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTemplate = void 0;
/**
 * @param template "toto {titi} tutu{titi}" + { titi: 5 } => "toto 5 tutu5"
 * @param replaceByKey
 * @returns
 * @example setTemplate("toto {a} tutu{a} {b}!", { a: 5, b: 'ok' }) => "toto 5 tutu5 ok!"
 */
const setTemplate = (template, replaceByKey) => template.replace(/\{(\w+)\}/g, (s, k) => replaceByKey[k] || s);
exports.setTemplate = setTemplate;
