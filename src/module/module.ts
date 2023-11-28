const g = globalThis as any;

export const modules: Record<string, any> = {};
export const moduleFallbacks: Record<string, string | (() => any)> = {
  XMLHttpRequest: 'xmlhttprequest-ssl',
  fetch: 'node-fetch',
  react: 'React',
};

export const _require = (key: string) => require(key);

export const getModule = (key: string): any => {
  let module = modules[key];
  if (module) return module;

  module = g[key];
  if (module) return (modules[key] = module);

  try {
    module = _require(key);
    if (module) return (modules[key] = module);
  } catch (error) {}

  const fallback = moduleFallbacks[key];
  try {
    if (fallback) {
      module = typeof fallback === 'string' ? getModule(fallback) : fallback();
      if (module) return (modules[key] = module);
    }
  } catch (error) {
    console.warn('module fallback', key, fallback);
  }

  throw new Error(`no module ${key}`);
};
