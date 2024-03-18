import { IMsg, IMsgFilter, IMsgHandler, IMsgReadonly, IMsgSet, IMsgSubscription } from './types';
export declare class Msg<T = any> implements IMsg<T> {
    static byKey: Record<string, Msg>;
    static get<T>(key: string, initValue: T, isStored?: boolean): Msg<T>;
    k?: string;
    /** Value */
    v: T;
    /** Handlers */
    private h;
    /** map and debounce */
    private s?;
    private sO?;
    private sH?;
    constructor(initValue: T, key?: string, sourceOff?: () => void);
    get val(): T;
    get value(): T;
    get key(): string | undefined;
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
