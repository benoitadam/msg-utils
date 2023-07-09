import {
  toString,
  toArray,
  toRecord,
  toBoolean,
  toDate,
  toError,
  toNumber,
} from '../src/index.node';

describe('cast', () => {
  test(`toString`, () => {
    expect(toString(0)).toEqual('0');
    expect(toString(5)).toEqual('5');
    expect(toString(undefined, 'a')).toBe('a');
  });

  test(`toArray`, () => {
    expect(toArray(0)).toEqual([0]);
    expect(toArray([5])).toEqual([5]);
    expect(toArray({ a: 1 })).toEqual([{ a: 1 }]);
  });

  test(`toRecord`, () => {
    expect(toRecord(0)).toEqual({});
    expect(toRecord([5], 'b')).toEqual('b');
    expect(toRecord({ a: 1 })).toEqual({ a: 1 });
  });

  test(`toBoolean`, () => {
    expect(toBoolean(0)).toEqual(false);
    expect(toBoolean(1)).toEqual(true);
    expect(toBoolean('true')).toEqual(true);
    expect(toBoolean('false')).toEqual(false);
    expect(toBoolean(undefined, 'b')).toEqual('b');
  });

  test(`toDate`, () => {
    const d0 = new Date(0);
    const now = new Date();
    const nowTime = now.getTime();
    expect(toDate(now, d0).getTime()).toEqual(nowTime);
    expect(toDate(nowTime, d0).getTime()).toEqual(nowTime);
  });

  test(`toError`, () => {
    expect(toError(new Error('test')).message).toEqual('test');
    expect(toError('test').message).toEqual('test');
  });

  test(`toNumber`, () => {
    expect(toNumber(0, 'a')).toEqual(0);
    expect(toNumber('', 'b')).toEqual('b');
    expect(toNumber(undefined, 'c')).toEqual('c');
    expect(toNumber('')).toEqual(undefined);
    expect(toNumber(' ')).toEqual(undefined);
    expect(toNumber(-5)).toEqual(-5);
    expect(toNumber('-5')).toEqual(-5);
    expect(toNumber('-7.3')).toEqual(-7.3);
    expect(toNumber('-2,4')).toEqual(-2.4);
    expect(toNumber('a2')).toEqual(2);
    expect(toNumber('2a')).toEqual(2);
  });
});
