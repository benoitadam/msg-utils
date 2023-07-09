import { removeItem, moveItem, last, range } from '../src/index.node';

describe('array', () => {
  test(`removeItem`, () => {
    const items: any[] = [0, 1, 2, 3];
    expect(removeItem(items, 3)).toEqual([0, 1, 2]);
    expect(removeItem(items, 2)).toEqual([0, 1]);
    expect(removeItem(items, 0)).toEqual([1]);
    const a = {};
    items.push(2, 3, a);
    expect(removeItem(items, a)).toEqual([1, 2, 3]);
  });

  test(`moveItem`, () => {
    const items: any[] = [0, 1, 2, 3];
    expect(moveItem(items, 3, -1)).toEqual([0, 1, 3, 2]);
    expect(moveItem(items, 3, +1)).toEqual([0, 1, 2, 3]);
    expect(moveItem(items, 0, +2)).toEqual([1, 2, 0, 3]);
    expect(moveItem(items, 0, -2)).toEqual([0, 1, 2, 3]);
    const a = {};
    items.push(a);
    expect(moveItem(items, a, -1)).toEqual([0, 1, 2, a, 3]);
    expect(moveItem(items, a, -1)).toEqual([0, 1, a, 2, 3]);
    expect(moveItem(items, a, +1)).toEqual([0, 1, 2, a, 3]);
    expect(moveItem(items, a, +1)).toEqual([0, 1, 2, 3, a]);
    expect(moveItem(items, a, +1)).toEqual([a, 0, 1, 2, 3]);
    expect(moveItem(items, a, +1)).toEqual([0, a, 1, 2, 3]);
    expect(moveItem(items, a, +5)).toEqual([0, a, 1, 2, 3]);
    expect(moveItem(items, a, +20)).toEqual([0, a, 1, 2, 3]);
    expect(moveItem(items, a, -20)).toEqual([0, a, 1, 2, 3]);
    expect(moveItem(items, a, +4)).toEqual([a, 0, 1, 2, 3]);
  });

  test(`last`, async () => {
    expect(last([0, 1, 2])).toEqual(2);
  }, 10);

  test(`range`, async () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(3, 5)).toEqual([3, 4, 5]);
  }, 10);
});
