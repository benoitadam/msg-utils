import { parseJson } from '../json/parseJson';
import { toBoolean } from '../cast/toBoolean';
import { toNumber } from '../cast/toNumber';
import { isDefined } from '../check/isDefined';

interface Env {
  (key: string): string;
  <T>(key: string, undefinedValue: T): string | T;
}

export const env = ((key: string, undefinedValue?: any): string | any => {
  const value = process.env[key];
  if (isDefined(value)) return value;
  if (isDefined(undefinedValue)) return undefinedValue;
  throw new Error(`env "${key}" is not defined`);
}) as Env;

export const envNumber = (key: string, undefinedValue?: number): number => {
  const value = toNumber(env(key, undefinedValue), undefined);
  if (isDefined(value)) return value;
  throw new Error(`env "${key}" is not a number`);
};

export const envBoolean = (key: string, undefinedValue?: boolean): boolean => {
  const value = toBoolean(env(key, undefinedValue), undefined);
  if (isDefined(value)) return value;
  throw new Error(`env "${key}" is not a boolean`);
};

interface EnvJson {
  <T = any>(key: string): T;
  <T = any>(key: string, undefinedValue: T): T;
}

export const envJson = ((key: string, undefinedValue: any): any => {
  const json = env(key, null);
  const value = json === null ? undefinedValue : parseJson(json);
  if (isDefined(value)) return value;
  throw new Error(`env "${key}" is not a valid json "${json}" "${value}"`);
}) as EnvJson;
