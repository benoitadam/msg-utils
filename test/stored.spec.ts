import { deleteKey, getStored, setStored } from '../src';

describe('stored', () => {
  const storage: { [key: string]: string } = {};
  (globalThis as any).localStorage = {
      getItem: (key: string) => storage[key] || null,
      removeItem: (key: string) => deleteKey(storage, key),
      setItem: (key: string, value: string) => storage[key] = value,
  };

  test(`store string`, () => {
    setStored('test1', 'abc');
    expect(getStored('test1')).toEqual('abc');
  });

  test(`store object`, () => {
    setStored('test2', { a: 1 });
    expect(getStored('test2')).toEqual({ a: 1 });
  });
});
