import toArray from './toArray';

export default <T = any>(v: T[] | T | null | undefined) => toArray(v);
