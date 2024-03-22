import { toVoid } from '../cast/toVoid';
import { removeItem } from '../array/removeItem';
import { isFunction } from '../check/isFunction';
import { isNotNull } from '../check/isNotNull';
import { debounce } from '../promise/debounce';
import { throttle } from '../promise/throttle';
import { storage } from '../storage/storage';
import { IMsg, IMsgFilter, IMsgHandler, IMsgReadonly, IMsgSet, IMsgSubscription } from './types';

export class Msg<T = any> implements IMsg<T> {
  static byKey: Record<string, Msg> = {};

  static from<T>(sourceOn: (target: IMsg<T>) => () => void, initValue: T): Msg<T>;
  static from<T>(sourceOn: (target: IMsg<T | undefined>) => () => void): Msg<T | undefined>;
  static from<T>(
    sourceOn: (target: IMsg<T | undefined>) => () => void,
    initValue?: T | undefined,
  ): Msg<T | undefined> {
    const target = new Msg<T | undefined>(initValue);
    target.sOn = () => sourceOn(target);
    target.sHandler = toVoid;
    return target;
  }

  static get<T>(key: string, initValue: T, isStored?: boolean): Msg<T> {
    let msg = this.byKey[key];
    if (msg) return msg;
    msg = new Msg<T>(initValue, key);
    if (isStored) {
      msg.set(storage.get(key, initValue));
      msg.on((val) => storage.set(key, val));
    }
    this.byKey[key] = msg;
    return msg;
  }

  public key?: string;

  /** Value */
  public v: T;

  /** Handlers */
  private h: IMsgHandler<T>[] = [];

  /** map and debounce */
  private sOn?: (handler: IMsgHandler<any>) => () => void;
  private sOff?: () => void;
  private sHandler?: IMsgHandler<any>;

  constructor(initValue: T, key?: string) {
    this.v = initValue;
    this.key = key;
  }

  get val(): T {
    return this.get();
  }

  get value(): T {
    return this.get();
  }

  get(): T {
    return this.v;
  }

  set(value: T, ignoreEqual?: boolean) {
    if (ignoreEqual || value !== this.v) {
      const old = this.v;
      this.v = value;
      this.h.forEach((h) => h(this.v, old));
    }
    return this;
  }

  next(value: T | ((value: T) => T), ignoreEqual?: boolean) {
    return this.set(isFunction(value) ? value(this.v) : value, ignoreEqual);
  }

  subscribe(handler: (next: T) => void): IMsgSubscription {
    return { unsubscribe: this.on(handler) };
  }

  pipe(target: IMsgSet<T>) {
    target.set(this.v);
    return this.on((val) => target.set(val));
  }

  on(handler: IMsgHandler<T>) {
    this.h.push(handler);
    if (!this.sOff && this.sOn && this.sHandler) this.sOff = this.sOn(this.sHandler);
    return () => this.off(handler);
  }

  off(handler: IMsgHandler<T>) {
    removeItem(this.h, handler);
    if (this.sOff && this.h.length === 0) {
      this.sOff();
      if (this.sOn && this.sHandler) delete this.sOff;
    }
  }

  map<U>(cb: (value: T) => U): IMsgReadonly<U>;
  map<U>(
    cb: (value: T) => U,
    sourceHandler: (target: IMsg<U>) => IMsgHandler<any>,
  ): IMsgReadonly<U>;
  map<U>(
    cb: (value: T) => U,
    sourceHandler?: (target: IMsg<U>) => IMsgHandler<any>,
  ): IMsgReadonly<U> {
    const source = this;
    const target = new Msg<U>(cb(source.v));
    target.sOn = (h) => source.on(h);
    target.sHandler =
      (sourceHandler && sourceHandler(target)) || ((value: any) => target.set(value));
    return target;
  }

  debounce(ms: number): IMsgReadonly<T> {
    return this.map(
      () => this.v,
      (target) => debounce((next) => target.set(next), ms),
    );
  }

  throttle(ms: number): IMsgReadonly<T> {
    return this.map(
      () => this.v,
      (target) => throttle((next) => target.set(next), ms),
    );
  }

  toPromise(filter: IMsgFilter<T> = isNotNull) {
    return new Promise<T>((resolve) => {
      if (filter(this.v)) return resolve(this.v);
      const off = this.on((val) => {
        if (!filter(val)) return;
        off();
        resolve(val);
      });
    });
  }
}
