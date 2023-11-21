import { IRegisters } from './IRegisters';

const g = globalThis as any;

export const registers: IRegisters = {
  crypto: g.crypto,
  react: g.React,
  localStorage: g.localStorage,
  XMLHttpRequest: g.XMLHttpRequest,
  fetch: g.fetch,
};
