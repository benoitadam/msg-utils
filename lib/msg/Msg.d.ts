import { IMsg, IMsgFilter, IMsgHandler, IMsgReadonly, IMsgSet, IMsgSubscription } from './types';
export declare class Msg<T = any> implements IMsg<T> {
    static byKey: Record<string, Msg>;
    static from<T>(sourceOn: (handler: IMsgHandler<any>) => () => void, initValue: T, sourceHandler?: (target: IMsg<T>) => IMsgHandler<any>): Msg<T>;
    static get<T>(key: string, initValue: T, isStored?: boolean): Msg<T>;
    key?: string;
    /** Value */
    v: T;
    /** Handlers */
    private h;
    /** map and debounce */
    private sOn?;
    private sOff?;
    private sHandler?;
    constructor(initValue: T, key?: string);
    get val(): T;
    get value(): T;
    get(): T;
    set(value: T, ignoreEqual?: boolean): this;
    next(value: T | ((value: T) => T), ignoreEqual?: boolean): this;
    subscribe(handler: (next: T) => void): IMsgSubscription;
    pipe(target: IMsgSet<T>): () => void;
    on(handler: IMsgHandler<T>): () => void;
    off(handler: IMsgHandler<T>): void;
    map<U>(cb: (value: T) => U): IMsgReadonly<U>;
    map<U>(cb: (value: T) => U, sourceHandler: (target: IMsg<U>) => IMsgHandler<any>): IMsgReadonly<U>;
    debounce(ms: number): IMsgReadonly<T>;
    throttle(ms: number): IMsgReadonly<T>;
    toPromise(filter?: IMsgFilter<T>): Promise<T>;
}
