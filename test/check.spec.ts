import { isArray, isDate, isEmpty, isRecord, isFunction, isNil, isString, isUuid } from '../src';

describe('check', () => {
  test(`isArray`, () => {
    expect(isArray(0)).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray([])).toBe(true);
  });

  test(`isDate`, () => {
    expect(isDate(0)).toBe(false);
    expect(isDate({})).toBe(false);
    expect(isDate(new Date())).toBe(true);
  });

  test(`isEmpty { a: 1 }`, () => {
    expect(isEmpty({ a: 1 })).toBe(false);
  });
  test(`isEmpty [1]`, () => {
    expect(isEmpty([1])).toBe(false);
  });
  test(`isEmpty 'a'`, () => {
    expect(isEmpty('a')).toBe(false);
  });
  test(`isEmpty []`, () => {
    expect(isEmpty([])).toBe(true);
  });
  test(`isEmpty {}`, () => {
    expect(isEmpty({})).toBe(true);
  });
  test(`isEmpty ''`, () => {
    expect(isEmpty('')).toBe(true);
  });
  test(`isEmpty false`, () => {
    expect(isEmpty(false)).toBe(true);
  });

  test(`isRecord`, () => {
    expect(isRecord({})).toBe(true);
    expect(isRecord([])).toBe(false);
    expect(isRecord('a')).toBe(false);
  });

  test(`isFunction`, () => {
    expect(isFunction(() => 1)).toBe(true);
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction({})).toBe(false);
    expect(isFunction('a')).toBe(false);
  });

  test(`isNil`, () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil('')).toBe(false);
    expect(isNil([])).toBe(false);
  });

  test(`isString`, () => {
    expect(isString('abc')).toBe(true);
    expect(isString('')).toBe(true);
    expect(isString([])).toBe(false);
  });

  test('isUuid 00000000-0000-0000-0000-000000000000', () => {
    expect(isUuid('00000000-0000-0000-0000-000000000000')).toBe(true);
  });
  test('isUuid ffffffff-ffff-ffff-ffff-ffffffffffff', () => {
    expect(isUuid('ffffffff-ffff-ffff-ffff-ffffffffffff')).toBe(true);
  });
  test('isUuid 7ae77ebe-16c8-458b-8a44-4396dbe7f6f4', () => {
    expect(isUuid('7ae77ebe-16c8-458b-8a44-4396dbe7f6f4')).toBe(true);
  });
  test('isUuid 7ae77ebe16c8458b8a444396dbe7f6f4', () => {
    expect(isUuid('7ae77ebe16c8458b8a444396dbe7f6f4')).toBe(true);
  });
});
