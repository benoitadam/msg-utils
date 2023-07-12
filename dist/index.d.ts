declare module "array/compact" {
    /**
     * Creates an array with all falsy values removed.
     * @param items
     * @returns
     */
    const _default: (value: any) => (Object | String | Number | Date)[];
    export default _default;
}
declare module "array/last" {
    /**
     * Returns the last item in the array.
     * @example last([3, 4, 5]) === 5
     * @param items
     * @returns
     */
    const _default_1: <T>(items: T[]) => T;
    export default _default_1;
}
declare module "array/moveIndex" {
    /**
     * Move an item in an array from an index to a new index.
     * @template T
     * @param {T[]} items - The array to move the item in.
     * @param {T} item - The item to move.
     * @param {number} addIndex - The index to move the item to.
     * @returns {T[]} A new array with the item moved.
     */
    const _default_2: <T>(items: T[], from: number, to: number) => T[];
    export default _default_2;
}
declare module "array/moveItem" {
    /**
     * Moves an item in an array to a new index.
     * @template T
     * @param {T[]} items - The array to move the item in.
     * @param {T} item - The item to move.
     * @param {number} addIndex - The index to move the item to.
     * @returns {T[]} A new array with the item moved.
     */
    const _default_3: <T>(items: T[], item: T, addIndex: number) => T[];
    export default _default_3;
}
declare module "check/isNil" {
    const _default_4: (value: any) => value is null | undefined;
    export default _default_4;
}
declare module "array/range" {
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
    const range: Range;
    export default range;
}
declare module "array/removeItem" {
    /**
     * Removes an item from an array.
     * @template T
     * @param {T[]} items - The array to remove the item from.
     * @param {T} item - The item to remove.
     * @returns {T[]} A new array with the item removed.
     */
    const _default_5: <T>(items: T[], item: T) => T[];
    export default _default_5;
}
declare module "cast/toString" {
    const _default_6: (v: any, def?: string) => string;
    export default _default_6;
}
declare module "cast/str" {
    const _default_7: (v: any) => string;
    export default _default_7;
}
declare module "check/isArray" {
    const _default_8: (arg: any) => arg is any[];
    export default _default_8;
}
declare module "check/isDate" {
    const _default_9: (value: any) => value is Date;
    export default _default_9;
}
declare module "check/isEmpty" {
    const _default_10: (value: any) => boolean;
    export default _default_10;
}
declare module "cast/tryCatch" {
    interface TryCatch {
        <T = any>(v: () => any): T | undefined;
        <T = any, U = any>(v: () => any, def: U): T | U;
    }
    const _default_11: TryCatch;
    export default _default_11;
}
declare module "json/getJson" {
    interface GetJson {
        (v: any): string | undefined;
        <T = any>(v: any, defVal: T, indented?: boolean): string | T;
    }
    const _default_12: GetJson;
    export default _default_12;
}
declare module "check/isRecord" {
    const _default_13: (value: any) => value is Record<any, any>;
    export default _default_13;
}
declare module "check/isEquals" {
    const isEquals: (a: any, b: any) => boolean;
    export default isEquals;
}
declare module "check/isFunction" {
    const _default_14: (value: any) => value is Function;
    export default _default_14;
}
declare module "check/isNotNull" {
    const _default_15: <T>(value: T) => value is NonNullable<T>;
    export default _default_15;
}
declare module "check/isString" {
    const _default_16: (value: any) => value is string;
    export default _default_16;
}
declare module "check/isUuid" {
    const _default_17: (value: any) => value is string;
    export default _default_17;
}
declare module "check/index" {
    export { default as isArray } from "check/isArray";
    export { default as isDate } from "check/isDate";
    export { default as isEmpty } from "check/isEmpty";
    export { default as isEquals } from "check/isEquals";
    export { default as isFunction } from "check/isFunction";
    export { default as isNil } from "check/isNil";
    export { default as isNotNull } from "check/isNotNull";
    export { default as isRecord } from "check/isRecord";
    export { default as isString } from "check/isString";
    export { default as isUuid } from "check/isUuid";
}
declare module "array/sort" {
    const _default_18: <T = any>(items: T[], prop?: (item: T) => string | number | Date) => T[];
    export default _default_18;
}
declare module "record/valueBy" {
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
    const _default_19: ValueBy;
    export default _default_19;
}
declare module "array/uniq" {
    const _default_20: <T>(arr: T[]) => T[];
    export default _default_20;
}
declare module "array/index" {
    export { default as compact } from "array/compact";
    export { default as last } from "array/last";
    export { default as moveIndex } from "array/moveIndex";
    export { default as moveItem } from "array/moveItem";
    export { default as range } from "array/range";
    export { default as removeItem } from "array/removeItem";
    export { default as sort } from "array/sort";
    export { default as uniq } from "array/uniq";
}
declare module "cast/toArray" {
    interface ToArray {
        <T = any>(v: T[] | T | null | undefined): T[];
        <T = any>(v: any, def: T[]): T[];
    }
    const _default_21: ToArray;
    export default _default_21;
}
declare module "cast/arr" {
    const _default_22: <T = any>(v: T | T[] | null | undefined) => T[];
    export default _default_22;
}
declare module "cast/toBoolean" {
    interface ToBoolean {
        (v: any): boolean | undefined;
        <T>(v: any, defVal: T): boolean | T;
    }
    const _default_23: ToBoolean;
    export default _default_23;
}
declare module "cast/bool" {
    const _default_24: (v: any) => boolean | undefined;
    export default _default_24;
}
declare module "cast/me" {
    const _default_25: <T = any>(value: T) => T;
    export default _default_25;
}
declare module "cast/toNumber" {
    interface ToNumber {
        (v: any): number | undefined;
        <D>(v: any, nanVal: D): number | D;
    }
    const _default_26: ToNumber;
    export default _default_26;
}
declare module "cast/nbr" {
    const _default_27: (v: any) => number;
    export default _default_27;
}
declare module "cast/toRecord" {
    interface ToRecord {
        <T = any>(v: T | null | undefined): T | Partial<T>;
        <T = any, U = any>(v: T | null | undefined, def: U): T | U;
    }
    const _default_28: ToRecord;
    export default _default_28;
}
declare module "cast/rec" {
    const _default_29: <T = any>(v: T | null | undefined) => T | Partial<T>;
    export default _default_29;
}
declare module "check/isNumber" {
    const _default_30: (value: any) => value is number;
    export default _default_30;
}
declare module "cast/toDate" {
    interface ToDate {
        (v: any): Date;
        <TDef>(v: any, defVal: TDef): Date | TDef;
        <TDef>(v: any, defVal?: TDef): Date | TDef | undefined;
    }
    const _default_31: ToDate;
    export default _default_31;
}
declare module "cast/toError" {
    const _default_32: (error: any) => Error;
    export default _default_32;
}
declare module "cast/toNull" {
    const _default_33: () => null;
    export default _default_33;
}
declare module "cast/toVoid" {
    const _default_34: () => void;
    export default _default_34;
}
declare module "cast/index" {
    export { default as arr } from "cast/arr";
    export { default as bool } from "cast/bool";
    export { default as me } from "cast/me";
    export { default as nbr } from "cast/nbr";
    export { default as rec } from "cast/rec";
    export { default as srt } from "cast/str";
    export { default as toArray } from "cast/toArray";
    export { default as toBoolean } from "cast/toBoolean";
    export { default as toDate } from "cast/toDate";
    export { default as toError } from "cast/toError";
    export { default as toNull } from "cast/toNull";
    export { default as toNumber } from "cast/toNumber";
    export { default as toRecord } from "cast/toRecord";
    export { default as toString } from "cast/toString";
    export { default as toVoid } from "cast/toVoid";
    export { default as tryCatch } from "cast/tryCatch";
}
declare module "stored/setStored" {
    const _default_35: <T = any>(key: string, value: T) => void;
    export default _default_35;
}
declare module "clipboard/copy" {
    const _default_36: (value: any) => Promise<void>;
    export default _default_36;
}
declare module "json/parseJson" {
    interface ParseJson {
        <T = any>(v: any): T | undefined;
        <T = any, U = any>(v: any, def: U): T | U;
    }
    const _default_37: ParseJson;
    export default _default_37;
}
declare module "stored/getStored" {
    interface GetStored {
        <T = any>(key: string): T | undefined;
        <T = any>(key: string, defVal?: T): T;
    }
    const _default_38: GetStored;
    export default _default_38;
}
declare module "clipboard/paste" {
    const _default_39: () => Promise<any>;
    export default _default_39;
}
declare module "clipboard/index" {
    export { default as copy } from "clipboard/copy";
    export { default as paste } from "clipboard/paste";
}
declare module "json/cloneJson" {
    interface CloneJson {
        <T = any>(v: T): T;
        <T = any>(v: T, defVal: T): T;
    }
    const _default_40: CloneJson;
    export default _default_40;
}
declare module "json/index" {
    export { default as cloneJson } from "json/cloneJson";
    export { default as getJson } from "json/getJson";
    export { default as parseJson } from "json/parseJson";
}
declare module "promise/debounce" {
    /**
     * @example
     * a b c - - - d - - e - -
     * - - - - c - - - d - - e
     */
    const _default_41: <A = unknown>(fn: (value: A) => unknown, ms: number) => (value: A) => void;
    export default _default_41;
}
declare module "promise/throttle" {
    /**
     * @example
     * a b c d - - - - e - f g - -
     * a - c - d - - - e - f - g - (2s)
     * a - - d - - - - e - - g - - (3s)
     * a - - - d - - - e - - - g - (4s)
     */
    const _default_42: <A = unknown>(fn: (value: A) => unknown, ms: number) => (value: A) => void;
    export default _default_42;
}
declare module "msg/types" {
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
}
declare module "msg/Msg" {
    import { IMsg, IMsgFilter, IMsgHandler, IMsgReadonly, IMsgSet, IMsgSubscription } from "msg/types";
    export default class Msg<T = any> implements IMsg<T> {
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
}
declare module "msg/index" {
    export { default as Msg } from "msg/Msg";
    export * from "msg/types";
}
declare module "number/bounds" {
    const _default_43: (val: number, min?: number, max?: number) => number;
    export default _default_43;
}
declare module "number/diff" {
    const _default_44: (arg1: number, arg2: number) => number;
    export default _default_44;
}
declare module "number/rand" {
    const _default_45: (min: number, max: number) => number;
    export default _default_45;
}
declare module "number/round" {
    const _default_46: (value: number, decimal?: number) => number;
    export default _default_46;
}
declare module "number/index" {
    export { default as bounds } from "number/bounds";
    export { default as diff } from "number/diff";
    export { default as rand } from "number/rand";
    export { default as round } from "number/round";
}
declare module "promise/retry" {
    const _default_47: <T>(createPromise: () => Promise<T>, retry?: number) => Promise<T>;
    export default _default_47;
}
declare module "promise/sleep" {
    const _default_48: (ms: number) => Promise<unknown>;
    export default _default_48;
}
declare module "promise/TimeoutError" {
    export default class TimeoutError extends Error {
        constructor(message?: string);
    }
}
declare module "promise/withTimeout" {
    const _default_49: <T>(promise: Promise<T>, timeoutMs?: number) => Promise<T>;
    export default _default_49;
}
declare module "promise/index" {
    export { default as debounce } from "promise/debounce";
    export { default as retry } from "promise/retry";
    export { default as sleep } from "promise/sleep";
    export { default as throttle } from "promise/throttle";
    export { default as TimeoutError } from "promise/TimeoutError";
    export { default as withTimeout } from "promise/withTimeout";
}
declare module "record/deleteKey" {
    const _default_50: <T>(record: Record<string, T>, ...keys: string[]) => Record<string, T>;
    export default _default_50;
}
declare module "record/groupBy" {
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
    const _default_51: GroupBy;
    export default _default_51;
}
declare module "record/sortKey" {
    const _default_52: <T extends Record<any, any>>(record: T) => T;
    export default _default_52;
}
declare module "record/index" {
    export { default as deleteKey } from "record/deleteKey";
    export { default as groupBy } from "record/groupBy";
    export { default as sortKey } from "record/sortKey";
    export { default as valueBy } from "record/valueBy";
}
declare module "rest/RestError" {
    export default class RestError extends Error {
        xhr: XMLHttpRequest;
        code: string;
        constructor(xhr: XMLHttpRequest);
    }
}
declare module "rest/types" {
    import type RestError from "rest/RestError";
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
}
declare module "rest/xhrRest" {
    import { RestOptions, RestURL } from "rest/types";
    const _default_53: <T = any>(xhr: XMLHttpRequest, url: RestURL, options?: RestOptions<T>) => Promise<T>;
    export default _default_53;
}
declare module "rest/Rest" {
    import { RestData, RestOptions, RestURL } from "rest/types";
    export default class Rest {
        options?: RestOptions | undefined;
        constructor(options?: RestOptions | undefined);
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
}
declare module "rest/index" {
    import Rest from "rest/Rest";
    export * from "rest/types";
    export { default as Rest } from "rest/Rest";
    export { default as RestError } from "rest/RestError";
    export { default as xhrRest } from "rest/xhrRest";
    export const rest: Rest;
}
declare module "stored/index" {
    export { default as getStored } from "stored/getStored";
    export { default as setStored } from "stored/setStored";
}
declare module "string/firstLower" {
    const _default_54: (arg: string) => string;
    export default _default_54;
}
declare module "string/firstUpper" {
    const _default_55: (arg: string) => string;
    export default _default_55;
}
declare module "string/clean" {
    const _default_56: (arg: string) => string;
    export default _default_56;
}
declare module "string/words" {
    const _default_57: (arg: string) => string[];
    export default _default_57;
}
declare module "string/pascal" {
    const _default_58: (arg: any) => string;
    export default _default_58;
}
declare module "string/camel" {
    const _default_59: (arg: string) => string;
    export default _default_59;
}
declare module "string/index" {
    export { default as camel } from "string/camel";
    export { default as clean } from "string/clean";
    export { default as firstLower } from "string/firstLower";
    export { default as firstUpper } from "string/firstUpper";
    export { default as pascal } from "string/pascal";
    export { default as words } from "string/words";
}
declare module "index" {
    export * from "array/index";
    export * from "cast/index";
    export * from "check/index";
    export * from "clipboard/index";
    export * from "json/index";
    export * from "msg/index";
    export * from "number/index";
    export * from "promise/index";
    export * from "record/index";
    export * from "rest/index";
    export * from "stored/index";
    export * from "string/index";
    export const VERSION: string;
}
declare module "msg-utils" {
    export * from "index";
}
declare module "array/first" {
    /**
     * Returns the first element of an array.
     * @example first([3, 4, 5]) === 3
     * @param items
     * @returns
     */
    const _default_60: <T>(items: T[]) => T;
    export default _default_60;
}
