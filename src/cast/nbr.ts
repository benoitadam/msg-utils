import { toNumber } from './toNumber';

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
export const nbr = (v: any) => toNumber(v, 0);
