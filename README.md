# msg-utils

Several small practical and light tools.

## array
## cast
## check
## clipboard
## json
## msg

### Use Msg with React

    import { useEffect, useState } from 'react';
    import Msg from '../msg/Msg';

    interface UseMsg {
    <T = any>(msg: Msg<T>): T;
    <T = any>(msg: Msg<T> | null | undefined): T | undefined;
    }

    export default (<T = any>(msg: Msg<T> | null | undefined): T | undefined => {
    const setState = useState(0)[1];
    useEffect(() => msg?.on(() => setState((i) => i + 1)), [msg]);
    return msg ? msg.get() : undefined;
    }) as UseMsg;

## number
## promise
## react
## record
## rest
## stored
## string