/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import type { SpawnOptions, ChildProcess } from 'child_process';
import type { Readable } from 'stream';
import { Msg } from '..';
export type CmdValues = Record<string, any>;
export interface CmdOptions extends SpawnOptions {
    encoding?: BufferEncoding;
    timeout?: number;
    noListen?: boolean;
}
export declare function readToEnd(stream: Readable): Promise<Buffer | undefined>;
export declare const chunksToBuffer: (chunks: any[]) => any;
export declare const chunksToString: (chunks: any[]) => string;
export declare class CmdReader {
    stream: Readable;
    readLength?: number;
    chunks: any[];
    data$?: Msg<any>;
    constructor(stream: Readable, encoding?: BufferEncoding);
    listen(): Msg<any> | undefined;
    read(): Promise<Buffer[]>;
    readBuffer(): Promise<any>;
    readString(): Promise<string>;
    toBuffer(): any;
    toString(): string;
}
export declare class Cmd {
    command: string;
    inputs?: CmdValues | null | undefined;
    options: CmdOptions;
    cp: ChildProcess;
    out?: CmdReader;
    err?: CmdReader;
    code?: number | null;
    error?: Error;
    constructor(command: string, inputs?: CmdValues | null | undefined, options?: CmdOptions);
    wait(): Promise<Cmd>;
    waitBuffer(): Promise<any>;
    waitString(): Promise<string | undefined>;
    kill(): void;
    end(): Promise<unknown>;
}
export declare const cmd: (command: string, values?: CmdValues, options?: CmdOptions) => Promise<string | undefined>;
