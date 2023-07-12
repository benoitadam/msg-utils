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
declare const _default: ValueBy;
export default _default;
