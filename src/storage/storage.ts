import { isNil } from '../check/isNil';
import { getJson } from '../json/getJson';
import { parseJson } from '../json/parseJson';
import { getModule, moduleAlias } from '../module';
import { IStore } from './IStore';
import { Store } from './Store';

export class Storage {
  public store: IStore;

  constructor(store?: IStore) {
    moduleAlias.localStorage = () => new Store();
    this.store = store || getModule('localStorage');
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
