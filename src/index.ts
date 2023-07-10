import NodeLocalStorage from './stored/NodeLocalStorage';
// import { XMLHttpRequest } from 'xmlhttprequest';
// import { webcrypto } from 'node:crypto';

if (!globalThis.localStorage)
    globalThis.localStorage = new NodeLocalStorage();

if (!globalThis.XMLHttpRequest)
    globalThis.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

if (!globalThis.crypto)
    globalThis.crypto = require('node:crypto').webcrypto as Crypto;

export * from './array';
export * from './cast';
export * from './check';
export * from './clipboard';
export * from './json';
export * from './msg';
export * from './number';
export * from './promise';
export * from './record';
export * from './rest';
export * from './stored';
export * from './string';

export const VERSION = __VERSION;