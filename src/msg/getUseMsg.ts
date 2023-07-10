import Msg from '../msg/Msg';

type Destructor = () => void;
type EffectCallback = () => (void | Destructor);
type DependencyList = readonly unknown[];
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

interface IReact {
    useEffect(effect: EffectCallback, deps?: DependencyList): void,
    useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]
}

interface UseMsg {
  <T = any>(msg: Msg<T>): T;
  <T = any>(msg: Msg<T> | null | undefined): T | undefined;
}

export default (React: IReact) => (<T = any>(msg: Msg<T> | null | undefined): T | undefined => {
  const setState = React.useState(0)[1];
  React.useEffect(() => msg?.on(() => setState((i) => i + 1)), [msg]);
  return msg ? msg.get() : undefined;
}) as UseMsg;
