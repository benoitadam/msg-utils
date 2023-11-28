interface ToNumber {
    /**
     * toNumber({}) -> undefined
     * toNumber('x') -> undefined
     * toNumber('5x') -> 5
     * toNumber(3.5) -> 3.5
     * toNumber('3.5') -> 3.5
     * toNumber('3,5') -> 3.5
     */
    (v: any): number | undefined;
    /**
     * toNumber({}, a) -> a
     * toNumber('x', a) -> a
     * toNumber('5x', a) -> 5
     * toNumber(3.5, a) -> 3.5
     * toNumber('3.5', a) -> 3.5
     * toNumber('3,5', a) -> 3.5
     */
    <D>(v: any, nanVal: D): number | D;
}
export declare const toNumber: ToNumber;
export {};
