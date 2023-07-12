declare module "msg-utils" {







    /**
     * Creates an array with all falsy values removed.
     * @param items
     * @returns
     */
    export const compact: (value: any) => (Object | String | Number | Date)[];

    /**
     * Returns the first element of an array.
     * @example first([3, 4, 5]) === 3
     * @param items
     * @returns
     */
    export const first: <T>(items: T[]) => T;

    /**
     * Returns the last item in the array.
     * @example last([3, 4, 5]) === 5
     * @param items
     * @returns
     */
    export const last: <T>(items: T[]) => T;

    /**
     * Move an item in an array from an index to a new index.
     * @template T
     * @param {T[]} items - The array to move the item in.
     * @param {T} item - The item to move.
     * @param {number} addIndex - The index to move the item to.
     * @returns {T[]} A new array with the item moved.
     */
    export const moveIndex: <T>(items: T[], from: number, to: number) => T[];

    /**
     * Moves an item in an array to a new index.
     * @template T
     * @param {T[]} items - The array to move the item in.
     * @param {T} item - The item to move.
     * @param {number} addIndex - The index to move the item to.
     * @returns {T[]} A new array with the item moved.
     */
    export const moveItem: <T>(items: T[], item: T, addIndex: number) => T[];

    export const isNil: (value: any) => value is null | undefined;

    interface Range {
        /**
         * Returns an array of min to max item
         * @example range(3, 5) => [3, 4, 5]
         * @param min
         * @param max
         */
        (min: number, max: number): number[];
        /**
         * Returns an array of length item
         * @example range(3) => [0, 1, 2]
         * @param length
         */
        (length: number): number[];
    }
    export const range: Range;

    /**
     * Removes an item from an array.
     * @template T
     * @param {T[]} items - The array to remove the item from.
     * @param {T} item - The item to remove.
     * @returns {T[]} A new array with the item removed.
     */
    export const removeItem: <T>(items: T[], item: T) => T[];

    export const toString: (v: any, def?: string) => string;

    export const str: (v: any) => string;

    export const isString: (value: any) => value is string;

    export const sort: <T = any>(items: T[], prop?: (item: T) => string | number | Date) => T[];

    interface TryCatch {
        <T = any>(v: () => any): T | undefined;
        <T = any, U = any>(v: () => any, def: U): T | U;
    }
    export const tryCatch: TryCatch;

    interface GetJson {
        (v: any): string | undefined;
        <T = any>(v: any, defVal: T, indented?: boolean): string | T;
    }
    export const getJson: GetJson;

    export const isRecord: (value: any) => value is Record<any, any>;

    export const isArray: (arg: any) => arg is any[];

    export const isFunction: (value: any) => value is Function;

    type IKey<T> = undefined | null | keyof T | ((item: T, index: number) => any);
    type IVal<T, U> = undefined | null | keyof T | ((item: T, index: number) => U);
    type RKey<T> = undefined | null | keyof T | ((item: T, key: string) => any);
    type RVal<T, U> = undefined | null | keyof T | ((item: T, key: string) => U);
    interface ValueBy {
        <T>(items: T[], key: IKey<T>): Record<string, T>;
        <T, U>(items: T[], key: IKey<T>, val: IVal<T, U>): Record<string, U>;
        <T>(record: Record<string, T>, key: RKey<T>): Record<string, T>;
        <T, U>(record: Record<string, T>, key: RKey<T>, val: RVal<T, U>): Record<string, U>;
    }
    export const valueBy: ValueBy;

    export const uniq: <T>(arr: T[]) => T[];

    interface ToArray {
        <T = any>(v: T[] | T | null | undefined): T[];
        <T = any>(v: any, def: T[]): T[];
    }
    export const toArray: ToArray;

    export const arr: <T = any>(v: T | T[] | null | undefined) => T[];

    interface ToBoolean {
        (v: any): boolean | undefined;
        <T>(v: any, defVal: T): boolean | T;
    }
    export const toBoolean: ToBoolean;

    export const bool: (v: any) => boolean | undefined;

    export const me: <T = any>(value: T) => T;

    interface ToNumber {
        (v: any): number | undefined;
        <D>(v: any, nanVal: D): number | D;
    }
    export const toNumber: ToNumber;

    export const nbr: (v: any) => number;

    interface ToRecord {
        <T = any>(v: T | null | undefined): T | Partial<T>;
        <T = any, U = any>(v: T | null | undefined, def: U): T | U;
    }
    export const toRecord: ToRecord;

    export const rec: <T = any>(v: T | null | undefined) => T | Partial<T>;

    export const isDate: (value: any) => value is Date;

    export const isNumber: (value: any) => value is number;

    interface ToDate {
        (v: any): Date;
        <TDef>(v: any, defVal: TDef): Date | TDef;
        <TDef>(v: any, defVal?: TDef): Date | TDef | undefined;
    }
    export const toDate: ToDate;

    export const toError: (error: any) => Error;

    export const toNull: () => null;

    export const toVoid: () => void;

    export const isEmpty: (value: any) => boolean;

    export const isEquals: (a: any, b: any) => boolean;

    export const isNotNull: <T>(value: T) => value is NonNullable<T>;

    export const isUuid: (value: any) => value is string;

    export const setStored: <T = any>(key: string, value: T) => void;

    export const copy: (value: any) => Promise<void>;

    interface ParseJson {
        <T = any>(v: any): T | undefined;
        <T = any, U = any>(v: any, def: U): T | U;
    }
    export const parseJson: ParseJson;

    interface GetStored {
        <T = any>(key: string): T | undefined;
        <T = any>(key: string, defVal?: T): T;
    }
    export const getStored: GetStored;

    export const paste: () => Promise<any>;

    interface CloneJson {
        <T = any>(v: T): T;
        <T = any>(v: T, defVal: T): T;
    }
    export const cloneJson: CloneJson;

    /**
     * @example
     * a b c - - - d - - e - -
     * - - - - c - - - d - - e
     */
    export const debounce: <A = unknown>(fn: (value: A) => unknown, ms: number) => (value: A) => void;

    /**
     * @example
     * a b c d - - - - e - f g - -
     * a - c - d - - - e - f - g - (2s)
     * a - - d - - - - e - - g - - (3s)
     * a - - - d - - - e - - - g - (4s)
     */
    export const throttle: <A = unknown>(fn: (value: A) => unknown, ms: number) => (value: A) => void;

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

    import { IMsg, IMsgFilter, IMsgHandler, IMsgReadonly, IMsgSet, IMsgSubscription } from "msg/types";
    export class Msg<T = any> implements IMsg<T> {
        static byKey: Record<string, Msg>;
        static get<T>(key: string, initValue: T, isStored?: boolean): Msg<T>;
        private k?;
        /** Value */
        private v;
        /** Handlers */
        private h;
        /** map and debounce */
        private s?;
        private sO?;
        private sH?;
        constructor(initValue: T, key?: string);
        get val(): T;
        get value(): T;
        get key(): string | undefined;
        get(): T;
        set(value: T): this;
        next(value: T | ((value: T) => T)): this;
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

    export const bounds: (val: number, min?: number, max?: number) => number;

    export const diff: (arg1: number, arg2: number) => number;

    export const rand: (min: number, max: number) => number;

    export const round: (value: number, decimal?: number) => number;

    export class TimeoutError extends Error {
        constructor(message?: string);
    }

    export const retry: <T>(createPromise: () => Promise<T>, retry?: number) => Promise<T>;

    export const sleep: (ms: number) => Promise<unknown>;

    export const withTimeout: <T>(promise: Promise<T>, timeoutMs?: number) => Promise<T>;

    export const deleteKey: <T>(record: Record<string, T>, ...keys: string[]) => Record<string, T>;

    type IKey<T> = undefined | null | keyof T | ((item: T, index: number) => any);
    type IVal<T, U> = undefined | null | keyof T | ((item: T, index: number) => U);
    type RKey<T> = undefined | null | keyof T | ((item: T, key: string) => any);
    type RVal<T, U> = undefined | null | keyof T | ((item: T, key: string) => U);
    interface GroupBy {
        <T>(items: T[], key: IKey<T>): Record<string, T[]>;
        <T, U>(items: T[], key: IKey<T>, val: IVal<T, U>): Record<string, U[]>;
        <T>(record: Record<string, T>, key: RKey<T>): Record<string, T[]>;
        <T, U>(record: Record<string, T>, key: RKey<T>, val: RVal<T, U>): Record<string, U[]>;
    }
    export const groupBy: GroupBy;

    export const sortKey: <T extends Record<any, any>>(record: T) => T;

    export type RestMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
    export type RestURL = string | URL;
    export type RestResponse<T = any> = {
        ok: boolean;
        data?: T;
        xhr: XMLHttpRequest;
    };
    export type RestParams = Record<string, undefined | string | number | (string | number)[]>;
    export type RestData = any;
    export type RestResponseType = XMLHttpRequestResponseType;
    export type RestOptions<T = any> = {
        method?: RestMethod;
        headers?: Record<string, string> | (() => Record<string, string>);
        baseUrl?: string;
        timeout?: number;
        params?: RestParams;
        data?: RestData;
        formData?: FormData;
        responseType?: XMLHttpRequestResponseType;
        send?: (xhr: XMLHttpRequest, body: string | FormData | undefined) => void;
        onInit?: (xhr: XMLHttpRequest) => void;
        onError?: (error: RestError, xhr: XMLHttpRequest) => void;
        onSuccess?: (data: T, xhr: XMLHttpRequest) => void;
        onProgress?: (e: ProgressEvent<XMLHttpRequestEventTarget>, progress: number) => void;
    };
    export class RestError extends Error {
        xhr: XMLHttpRequest;
        code: string;
        constructor(xhr: XMLHttpRequest);
    }
    export class Rest {
        options?: RestOptions<any> | undefined;
        constructor(options?: RestOptions<any> | undefined);
        new(options?: RestOptions): Rest;
        newXhr(): XMLHttpRequest;
        send<T = any>(url: RestURL, options?: RestOptions<T>): Promise<T>;
        get<T = any>(url: RestURL, options?: RestOptions<T>): Promise<T>;
        delete<T = any>(url: RestURL, options?: RestOptions<T>): Promise<T>;
        post<T = any>(url: RestURL, data?: RestData, options?: RestOptions<T>): Promise<T>;
        patch<T = any>(url: RestURL, data?: RestData, options?: RestOptions<T>): Promise<T>;
        put<T = any>(url: RestURL, data?: RestData, options?: RestOptions<T>): Promise<T>;
        upload<T = any>(url: RestURL, name: string, file: File, fileName?: string, options?: RestOptions<T>): Promise<T>;
    }
    export const rest: Rest;

    export const firstLower: (arg: string) => string;

    export const firstUpper: (arg: string) => string;

    export const clean: (arg: string) => string;

    export const words: (arg: string) => string[];

    export const pascal: (arg: any) => string;

    export const camel: (arg: string) => string;
}
