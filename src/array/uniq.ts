import { getJson } from '../json/getJson';
import { valueBy } from '../record/groupBy';

export const uniq = <T>(arr: T[]): T[] => Object.values(valueBy(arr, (v) => getJson(v))) as T[];
