/**
 * nbr('a') -> 0
 * nbr({}) -> 0
 * nbr('5x') -> 5
 * nbr(10) -> 10
 * nbr(3.5) -> 3.5
 * nbr('3.5') -> 3.5
 * nbr('3,5') -> 3.5
 * @param v
 * @returns
 */
export declare const nbr: (v: any) => number;
