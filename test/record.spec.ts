import { deleteKey, groupBy, valueBy, getChanges, merge } from '../src';

describe('record', () => {
  const a = { id: 'a', p: 'pa', x: 0 };
  const b = { id: 'b', p: 'pb', x: 0 };
  const c = { id: 'c', p: 'pc', x: 1 };
  const d = { id: 'd', p: 'pd', x: 2 };
  const items = [a, b, c, d];
  const record = { a, b, c, d };

  test(`@example`, () => {
    var isEqual = (a: any, b: any) => expect(a).toEqual(b);

    var a = { x: 5 },
      b = { x: 6 },
      c = { x: 6 };
    isEqual(
      groupBy([5, 6, 6], (v) => v),
      { 5: [5], 6: [6, 6] },
    );
    isEqual(
      groupBy(
        [5, 6, 6],
        (v) => v,
        (v, i) => i,
      ),
      { 5: [0], 6: [1, 2] },
    );
    isEqual(
      groupBy([a, b, c], (v) => v.x),
      { 5: [a], 6: [b, c] },
    );
    isEqual(
      groupBy({ a, b, c }, null, (v) => v.x),
      { a: [5], b: [6], c: [6] },
    );
    isEqual(groupBy([a, b, c]), groupBy({ 0: a, 1: b, 2: c }));

    var a = { x: 5 },
      b = { x: 6 },
      c = { x: 6 };
    isEqual(
      valueBy([5, 6, 6], (v) => v),
      { 5: 5, 6: 6 },
    );
    isEqual(
      valueBy(
        [5, 6, 6],
        (v) => v,
        (v, i) => i,
      ),
      { 5: 0, 6: 2 },
    );
    isEqual(
      valueBy([a, b, c], (v) => v.x),
      { 5: a, 6: b },
    );
    isEqual(
      valueBy({ a, b, c }, null, (v) => v.x),
      { a: 5, b: 6, c: 6 },
    );
    isEqual(valueBy([a, b, c]), valueBy({ 0: a, 1: b, 2: c }));
  });

  // test(`byProp`, () => {
  //   const a = { id: 'ka', p: 'pa' };
  //   const b = { id: 'kb', p: 'pb' };
  //   const c = { id: 'kc', p: 'pc' };
  //   expect(byProp([a, b, c], i => i.p)).toEqual({ pa: a, pb: b, pc: c });
  // });

  test(`deleteKey`, () => {
    expect(deleteKey({ ...record }, 'a')).toEqual({ b, c, d });
    expect(deleteKey({ ...record }, 'b')).toEqual({ a, c, d });
  });

  test(`groupBy`, () => {
    expect(groupBy(items, null, null)).toEqual({ 0: [a], 1: [b], 2: [c], 3: [d] });
    expect(groupBy(items, (i) => i.id)).toEqual({ a: [a], b: [b], c: [c], d: [d] });
    expect(groupBy(items, (i) => i.p)).toEqual({ pa: [a], pb: [b], pc: [c], pd: [d] });
    expect(groupBy(items, (i) => i.x)).toEqual({ 0: [a, b], 1: [c], 2: [d] });
    expect(
      groupBy(
        items,
        (i) => i.x,
        (i) => i.p,
      ),
    ).toEqual({ 0: ['pa', 'pb'], 1: ['pc'], 2: ['pd'] });
    expect(groupBy(record, null, (i) => i.p)).toEqual({
      a: ['pa'],
      b: ['pb'],
      c: ['pc'],
      d: ['pd'],
    });
    expect(
      groupBy(
        record,
        (i) => i.x,
        (i) => i.p,
      ),
    ).toEqual({ 0: ['pa', 'pb'], 1: ['pc'], 2: ['pd'] });
    expect(groupBy(record, null)).toEqual({ a: [a], b: [b], c: [c], d: [d] });
  });

  test(`valueBy`, () => {
    expect(valueBy(items, null, null)).toEqual({ 0: a, 1: b, 2: c, 3: d });
    expect(valueBy(items, (i) => i.id)).toEqual({ a, b, c, d });
    expect(valueBy(items, (i) => i.p)).toEqual({ pa: a, pb: b, pc: c, pd: d });
    expect(valueBy(items, (i) => i.x)).toEqual({ 0: b, 1: c, 2: d });
    expect(
      valueBy(
        items,
        (i) => i.x,
        (i) => i.p,
      ),
    ).toEqual({ 0: 'pb', 1: 'pc', 2: 'pd' });
    expect(valueBy(record, (i) => i.x)).toEqual({ 0: b, 1: c, 2: d });
    expect(valueBy(record, null, (i) => i.x)).toEqual({ a: 0, b: 0, c: 1, d: 2 });
  });

  test(`getChanges`, () => {
    expect(getChanges({ a: 1 }, { a: 1, b: 2 })).toEqual({ b: 2 });
    expect(getChanges({ a: 1 }, { a: 2, b: 2 })).toEqual({ a: 2, b: 2 });
  });

  test(`merge`, () => {
    expect(merge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    expect(merge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
  });
});
