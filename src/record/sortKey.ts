import { entries } from './entries';
import { fromEntries } from './fromEntries';

export const sortKey = <T extends Record<any, any>>(record: T): T =>
  fromEntries(entries(record).sort((a, b) => a[0].localeCompare(b[0]))) as T;
