import { isNil } from './check/isNil';
import { getJson } from './json/getJson';
import { parseJson } from './json/parseJson';

export interface IStore {
  getItem(key: string): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
}

export class Store implements IStore {
  data: Record<string, any> = {};
  getItem(key: string) {
    return this.data[key] || null
  }
  removeItem(key: string) {
    delete this.data[key];
    this.save && this.save(this);
  }
  setItem(key: string, val: string) {
    this.data[key] = val;
    this.save && this.save(this);
  }
  save?: (store: Store) => void;
}

export class Storage {
  public store: IStore;

  constructor(localStorage?: IStore) {
    this.store = localStorage || globalThis.localStorage || new Store();
  }

  set<T = any>(key: string, value: T) {
    const json = isNil(value) ? undefined : getJson(value);
    if (isNil(json)) this.store.removeItem(key);
    else this.store.setItem(key, json);
  }

  get<T = any>(key: string): T | undefined;
  get<T = any>(key: string, defVal?: T): T;
  get<T = any>(key: string, defVal?: T): T | undefined {
    return parseJson(this.store.getItem(key), defVal);
  }
}

export const storage = new Storage();