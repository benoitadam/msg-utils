import { storage } from '../src';

describe('stored', () => {
  test(`store string`, () => {
    storage.set('test1', 'abc');
    expect(storage.get('test1')).toEqual('abc');
  });

  test(`store object`, () => {
    storage.set('test2', { a: 1 });
    expect(storage.get('test2')).toEqual({ a: 1 });
  });
});
