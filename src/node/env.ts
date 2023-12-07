import { isDefined } from "../check/isDefined";

interface Env {
    (key: string): string;
    (key: string, cast: null, def: string): string;
    <T=any>(key: string, cast: (value: string) => T|undefined): T;
    <T=any, U=any>(key: string, cast: (value: string) => T|undefined, def: U): T|U;
}

export const env = ((key: string, cast?: any|((value: string|undefined) => any), undefinedValue?: any): any => {
    const value = process.env[key];
    const result = cast ? cast(value) : value;
    if (isDefined(result)) return result;
    if (isDefined(undefinedValue)) return undefinedValue;
    throw new Error(`env "${key}" is not correct`);
}) as Env;
