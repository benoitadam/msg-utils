const map: Record<string, HTMLScriptElement> = {};

export const addJsFile = (url: string): HTMLScriptElement => {
  if (map[url]) return map[url];
  const el = document.createElement('script');
  el.type = 'text/javascript';
  el.async = true;
  el.src = url;
  map[url] = document.head.appendChild(el);
  return el;
};
