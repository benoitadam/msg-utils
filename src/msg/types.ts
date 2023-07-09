export type IMsgHandler<T> = (value: T, oldValue: T) => void;
export type IMsgFilter<T> = (value: T) => boolean;

export interface IMsgSubscription {
  unsubscribe(): void;
}

export interface IMsgSubscribe<T> {
  subscribe(handler: (next: T) => void): IMsgSubscription;
}

export interface IMsgGet<T> {
  get(): T;
}

export interface IMsgSet<T> {
  set(value: T): IMsg<T>;
}

export interface IMsgReadonly<T> extends IMsgGet<T>, IMsgSubscribe<T> {
  get key(): string | undefined;
  get val(): T;
  get value(): T;

  on(h: IMsgHandler<T>): () => void;
  off(h: IMsgHandler<T>): void;

  map<U>(cb: (val: T) => U): IMsgReadonly<U>;
  debounce(ms: number): IMsgReadonly<T>;
  throttle(ms: number): IMsgReadonly<T>;

  pipe(target: IMsgSet<T>): () => void;

  toPromise(filter?: IMsgFilter<T>): Promise<T>;
}

export interface IMsg<T> extends IMsgReadonly<T>, IMsgSet<T> {
  next(value: T | ((value: T) => T)): IMsg<T>;
}
