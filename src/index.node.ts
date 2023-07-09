import NodeLocalStorage from './stored/NodeLocalStorage';
import { XMLHttpRequest } from 'xmlhttprequest';
import { webcrypto } from 'node:crypto';

globalThis.localStorage = new NodeLocalStorage();
globalThis.XMLHttpRequest = XMLHttpRequest;
globalThis.crypto = webcrypto as Crypto;

export * from './index.common';
export const VERSION = __VERSION;
