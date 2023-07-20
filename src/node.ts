import crypto from 'node:crypto';
import XMLHttpRequest from 'xmlhttprequest-ssl';
import { deleteKey } from './record/deleteKey';

// for uuid
globalThis.crypto = crypto as Crypto;

// for Rest
globalThis.XMLHttpRequest = XMLHttpRequest;

const storage: { [key: string]: string } = {};
(globalThis as any).localStorage = {
    getItem: (key: string) => storage[key] || null,
    removeItem: (key: string) => deleteKey(storage, key),
    setItem: (key: string, value: string) => storage[key] = value,
};

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
