import { isRecord } from '../check/isRecord';
import { isArray } from '../check/isArray';
import { isFunction } from '../check/isFunction';
import { isNil } from '../check/isNil';

export type ArRecKey<T> = undefined | null | keyof T | ((item: T, index: number) => any);
export type ArRecVal<T, U> = undefined | null | keyof T | ((item: T, index: number) => U);
export type RecKey<T> = undefined | null | keyof T | ((item: T, key: string) => any);
export type RecVal<T, U> = undefined | null | keyof T | ((item: T, key: string) => U);

interface GroupBy {
  <T>(items: T[], key: ArRecKey<T>): Record<string, T[]>;
  <T, U>(items: T[], key: ArRecKey<T>, val: ArRecVal<T, U>): Record<string, U[]>;
  <T>(record: Record<string, T>, key: RecKey<T>): Record<string, T[]>;
  <T, U>(record: Record<string, T>, key: RecKey<T>, val: RecVal<T, U>): Record<string, U[]>;
}

interface ValueBy {
  <T>(items: T[], key: ArRecKey<T>): Record<string, T>;
  <T, U>(items: T[], key: ArRecKey<T>, val: ArRecVal<T, U>): Record<string, U>;
  <T>(record: Record<string, T>, key: RecKey<T>): Record<string, T>;
  <T, U>(record: Record<string, T>, key: RecKey<T>, val: RecVal<T, U>): Record<string, U>;
}

const _groupBy = (items: any, key: any, val: any, add: any) => {
  const getK = isFunction(key) ? key : isNil(key) ? (_: any, k: any) => k : (i: any) => i[key];
  const getV = isFunction(val) ? val : isNil(val) ? (i: any) => i : (i: any) => i[val];
  if (isArray(items)) {
    items.forEach((item, index) => {
      add(getK(item, index), getV(item, index));
    });
  }
  if (isRecord(items)) {
    Object.entries(items).forEach(([key, val]) => {
      add(getK(val, key), getV(val, key));
    });
  }
};

export const groupBy = ((items: any, key: any, val?: any): Record<string, any[]> => {
  const r: Record<string, any[]> = {};
  _groupBy(items, key, val, (k: any, v: any) => {
    (r[k] || (r[k] = [])).push(v);
  });
  return r;
}) as GroupBy;

export const valueBy = ((items: any, key: any, val?: any): Record<string, any> => {
  const r: Record<string, any> = {};
  _groupBy(items, key, val, (k: any, v: any) => {
    r[k] = v;
  });
  return r;
}) as ValueBy;
