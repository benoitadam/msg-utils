import { isRecord } from '../check';

interface ToRecord {
  <T = any>(v: T | null | undefined): T | Partial<T>;
  <T = any, U = any>(v: T | null | undefined, def: U): T | U;
}

export default (<T = any>(v: any, def: T = {} as any): T => (isRecord(v) ? v : def)) as ToRecord;
