import type { IMsgReadonly } from './types';
import { getModule } from '../module';

interface UseMsg {
  <T = any>(msg: IMsgReadonly<T>): T;
  <T = any>(msg: IMsgReadonly<T> | null | undefined): T | undefined;
}

export const useMsg = (<T = any>(msg: IMsgReadonly<T> | null | undefined): T | undefined => {
  const react = getModule('react');
  const setState = react.useState(0)[1];
  react.useEffect(() => msg?.on(() => setState((i: number) => i + 1)), [msg]);
  return msg ? msg.get() : undefined;
}) as UseMsg;
