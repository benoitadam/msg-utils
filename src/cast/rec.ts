import toRecord from './toRecord';

export default <T = any>(v: T | null | undefined) => toRecord<T>(v);
