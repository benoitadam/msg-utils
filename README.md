# msg-utils

Several small practical and light tools.

## For React

### useMsg hooks

    import { Msg } from "msg-utils";
    import { useEffect, useState } from "react";

    export default function useMsg<T = any>(msg: Msg<T>): T;
    export default function useMsg<T = any>(msg: Msg<T> | null | undefined): T | undefined;
    export default function useMsg<T = any>(msg: Msg<T> | null | undefined): T | undefined {
        const setState = useState(0)[1];
        useEffect(() => msg?.on(() => setState((i) => i + 1)), [msg]);
        return msg ? msg.get() : undefined;
    };

## For NodeJs

### For getStored and setStored

    const storage: { [key: string]: string } = {};
    (globalThis as any).localStorage = {
        getItem: (key: string) => storage[key] || null,
        removeItem: (key: string) => deleteKey(storage, key),
        setItem: (key: string, value: string) => storage[key] = value,
    };

### For Rest

    globalThis.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

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


    "@types/react": "^18.2.14",
    "@types/jest": "^29.5.2",
    "jest": "^29.5.0",
    "react": "^18.2.0",
    "xmlhttprequest": "^1.8.0"