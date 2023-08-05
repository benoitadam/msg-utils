import { IStore } from "./IStore";

export class Store implements IStore {
    data: Record<string, any> = {};
    getItem(key: string) {
        return this.data[key] || null;
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
