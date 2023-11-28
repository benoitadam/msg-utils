import { RestURL, RestData, RestOptions } from './interfaces';
export declare class Rest {
    options: Partial<RestOptions>;
    constructor(options?: Partial<RestOptions>);
    req<T = any>(options: RestOptions<T>): Promise<T>;
    get<T = any>(url: RestURL, options?: RestOptions<T>): Promise<T>;
    delete<T = any>(url: RestURL, options?: RestOptions<T>): Promise<T>;
    post<T = any>(url: RestURL, data?: RestData, options?: RestOptions<T>): Promise<T>;
    patch<T = any>(url: RestURL, data?: RestData, options?: RestOptions<T>): Promise<T>;
    put<T = any>(url: RestURL, data?: RestData, options?: RestOptions<T>): Promise<T>;
    upload<T = any>(url: RestURL, name: string, file: File, fileName?: string, options?: RestOptions<T>): Promise<T>;
}
export declare const rest: Rest;
