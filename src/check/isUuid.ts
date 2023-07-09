export default (value: any): value is string => {
  const code = String(value).replace(/[a-zA-Z0-9]+/g, (a) => '' + a.length);
  return code === '8-4-4-4-12' || code === '32';
};
