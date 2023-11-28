import type { IMsgReadonly } from './types';
interface UseMsg {
    <T = any>(msg: IMsgReadonly<T>): T;
    <T = any>(msg: IMsgReadonly<T> | null | undefined): T | undefined;
}
export declare const useMsg: UseMsg;
export {};
