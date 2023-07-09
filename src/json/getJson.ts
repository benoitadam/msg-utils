import tryCatch from '../cast/tryCatch';

interface GetJson {
  (v: any): string | undefined;
  <T = any>(v: any, defVal: T, indented?: boolean): string | T;
}

export default (<T>(v: any, def?: T, indented?: boolean): string | T | undefined =>
  tryCatch(() => JSON.stringify(v, null, indented ? 2 : 0), def)) as GetJson;
