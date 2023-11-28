import { IStore } from './IStore';
export declare class Storage {
    store: IStore;
    constructor(store?: IStore);
    set<T = any>(key: string, value: T): void;
    get<T = any>(key: string): T | undefined;
    get<T = any>(key: string, defVal?: T): T;
}
export declare const storage: Storage;
