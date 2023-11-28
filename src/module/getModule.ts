import { moduleAlias } from './moduleAlias';
import { modules } from './modules';

const g = globalThis as any;

export const getModule = (key: string): any => {
  let module = modules[key];
  if (module) return module;

  module = g[key];
  if (module) return (modules[key] = module);

  if (typeof require !== 'undefined') {
    try {
      module = require(key);
      if (module) return (modules[key] = module);
    } catch (error) {}
  }

  const alias = moduleAlias[key];
  try {
    if (alias) {
      module = typeof alias === 'string' ? getModule(alias) : alias();
      if (module) return (modules[key] = module);
    }
  } catch (error) {
    console.warn('module alias', key, alias);
  }

  throw new Error(`no module ${key}`);
};
