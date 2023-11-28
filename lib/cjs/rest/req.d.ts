import { RestSend, RestContext } from './interfaces';
export declare class RestError<T = any> extends Error {
    ctx: RestContext<T>;
    name: string;
    constructor(ctx: RestContext<T>);
}
export declare const reqXHR: <T = any>(ctx: RestContext<T>) => Promise<void>;
export declare const reqFetch: <T = any>(ctx: RestContext<T>) => Promise<void>;
export declare const req: RestSend;
