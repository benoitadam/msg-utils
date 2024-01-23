import { isRecord } from '../check/isRecord';

interface ToRecord {
  <T = any>(v: T): T;
  <T = any>(v: T | null | undefined): T | undefined;
  <T = any, U = any>(v: T | null | undefined, def: U): T | U;
}

/**
 * Converts the provided value to a record, or returns a default value if the conversion is not possible.
 *
 * The function has three overloads:
 * - When a single argument is provided, it returns the argument itself if it can be a record, otherwise undefined.
 * - When a value and a default value are provided, it returns the value if it can be a record, otherwise the default value.
 * - If the provided value is null or undefined, the function returns undefined or the provided default value.
 *
 * @template T - The expected type of the record.
 * @template U - The type of the default value.
 * @param {T | null | undefined} v - The value to be converted to a record.
 * @param {U} [def={}] - The default value to return if the conversion is not possible.
 * @returns {T | U | undefined} - The record or the default value.
 */
export const toRecord = (<T = any>(v: any, def: T = {} as any): T =>
  isRecord(v) ? v : def) as ToRecord;
