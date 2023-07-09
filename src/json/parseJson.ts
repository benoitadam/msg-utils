import tryCatch from '../cast/tryCatch';

interface ParseJson {
  <T = any>(v: any): T | undefined;
  <T = any, U = any>(v: any, def: U): T | U;
}

export default (<T, U>(v: any, def?: U): T | U | undefined =>
  tryCatch(() => JSON.parse(v) as T, def)) as ParseJson;
