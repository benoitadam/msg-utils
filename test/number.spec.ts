import { bounds, diff, rand, round } from '../src/index.node';

describe('number', () => {
  test(`bounds`, () => {
    expect(bounds(1, 5, 8)).toEqual(5);
    expect(bounds(10, 5, 10)).toEqual(10);
    expect(bounds(15, 5, 10)).toEqual(10);
    expect(bounds(5, undefined, 10)).toEqual(5);
    expect(bounds(15, undefined, 10)).toEqual(10);
    expect(bounds(5, 10)).toEqual(10);
    expect(bounds(15, 10)).toEqual(15);
  });
  
  test(`diff`, () => {
    expect(diff(1, 5)).toEqual(4);
  });

  test(`rand`, () => {
    expect(rand(5, 6)).toBeGreaterThan(5);
    expect(rand(5, 5.0001)).toBeGreaterThan(5);
    expect(rand(4.9999, 5)).toBeLessThan(5);
    expect(rand(5, 6)).toBeGreaterThan(5);
    expect(rand(5, 6)).toBeLessThan(6);
  });
  
  test(`round`, () => {
    expect(round(1.12345)).toEqual(1);
    expect(round(1.12345, 1)).toEqual(1.1);
    expect(round(1.12345, 2)).toEqual(1.12);
    expect(round(1.12999, 2)).toEqual(1.13);
    expect(round(1.123001, 3)).toEqual(1.123);
    expect(round(123.456123, 4)).toEqual(123.4561);
    expect(round(123.456123, -1)).toEqual(120);
    expect(round(123.456123, -2)).toEqual(100);
  });
});


