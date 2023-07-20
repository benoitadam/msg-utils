import { useEffect, useState } from 'react';
import type { IMsgReadonly } from '../msg/types';

interface UseMsg {
    <T = any>(msg: IMsgReadonly<T>): T;
    <T = any>(msg: IMsgReadonly<T> | null | undefined): T | undefined;
}

export const useMsg = (<T = any>(msg: IMsgReadonly<T> | null | undefined): T | undefined => {
    const setState = useState(0)[1];
    useEffect(() => msg?.on(() => setState((i) => i + 1)), [msg]);
    return msg ? msg.get() : undefined;
}) as UseMsg;
