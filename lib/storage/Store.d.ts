import { IStore } from './IStore';
export declare class Store implements IStore {
    data: Record<string, any>;
    getItem(key: string): any;
    removeItem(key: string): void;
    setItem(key: string, val: string): void;
    save?: (store: Store) => void;
}
