export type ArRecKey<T> = undefined | null | keyof T | ((item: T, index: number) => any);
export type ArRecVal<T, U> = undefined | null | keyof T | ((item: T, index: number) => U);
export type RecKey<T> = undefined | null | keyof T | ((item: T, key: string) => any);
export type RecVal<T, U> = undefined | null | keyof T | ((item: T, key: string) => U);
interface GroupBy {
    <T>(items: T[], key?: ArRecKey<T>): Record<string, T[]>;
    <T, U>(items: T[], key: ArRecKey<T>, val: ArRecVal<T, U>): Record<string, U[]>;
    <T>(record: Record<string, T>, key?: RecKey<T>): Record<string, T[]>;
    <T, U>(record: Record<string, T>, key: RecKey<T>, val: RecVal<T, U>): Record<string, U[]>;
}
interface ValueBy {
    <T>(items: T[], key?: ArRecKey<T>): Record<string, T>;
    <T, U>(items: T[], key: ArRecKey<T>, val: ArRecVal<T, U>): Record<string, U>;
    <T>(record: Record<string, T>, key?: RecKey<T>): Record<string, T>;
    <T, U>(record: Record<string, T>, key: RecKey<T>, val: RecVal<T, U>): Record<string, U>;
}
/**
 * @example
 * var a = { x:5 }, b = { x:6 }, c = { x:6 };
 * isEqual( groupBy([ 5, 6, 6 ], v => v), { 5: [5], 6: [6, 6] } );
 * isEqual( groupBy([ 5, 6, 6 ], v => v, (v, i) => i), { 5: [0], 6: [1, 2] } );
 * isEqual( groupBy([ a, b, c ], v => v.x), { 5: [a], 6: [b, c] } );
 * isEqual( groupBy({ a, b, c }, null, v => v.x), { a: [5], b: [6], c: [6] } );
 * isEqual( groupBy([ a, b, c ]), groupBy({ 0:a, 1:b, 2:c }) );
 */
export declare const groupBy: GroupBy;
/**
 * @example
 * var a = { x:5 }, b = { x:6 }, c = { x:6 };
 * isEqual( valueBy([ 5, 6, 6 ], v => v), { 5: 5, 6: 6 } );
 * isEqual( valueBy([ 5, 6, 6 ], v => v, (v, i) => i), { 5: 0, 6: 2 } );
 * isEqual( valueBy([ a, b, c ], v => v.x), { 5: a, 6: b } );
 * isEqual( valueBy({ a, b, c }, null, v => v.x), { a: 5, b: 6, c: 6 } );
 * isEqual( valueBy([ a, b, c ]), valueBy({ 0:a, 1:b, 2:c }) );
 */
export declare const valueBy: ValueBy;
export {};
