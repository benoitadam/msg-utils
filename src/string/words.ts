import clean from './clean';

export default (arg: string): string[] =>
  clean(arg)
    .replace(/[a-z0-9][A-Z]/g, (s) => s[0] + ' ' + s[1].toLowerCase())
    .toLowerCase()
    .trim()
    .split(' ')
    .filter((s) => s);
