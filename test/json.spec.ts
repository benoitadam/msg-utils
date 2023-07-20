import { parseJson, getJson, cloneJson } from '../src/node';

describe('json', () => {
  test(`cloneJson`, () => {
    const a = { n: 1 };
    expect(cloneJson('abcd')).toEqual('abcd');
    expect(cloneJson(a, { n: 2 }).n).toEqual(a.n);
    const b = cloneJson(a);
    b.n = 2;
    expect(b).not.toEqual(a);
  });

  test(`parseJson`, () => {
    expect(parseJson('"abcd"')).toEqual('abcd');
    expect(parseJson('{"a":1}')).toEqual({ a: 1 });
    expect(parseJson('{"a1')).toEqual(undefined);
    expect(parseJson('{"a1', 'error')).toEqual('error');
  });

  test(`getJson`, () => {
    expect(getJson('abcd')).toEqual('"abcd"');
    expect(getJson({ a: 1 })).toEqual('{"a":1}');
    var a: any = {};
    a.a = a;
    expect(getJson(a)).toEqual(undefined);
    expect(getJson(a, 'error')).toEqual('error');
  });
});
