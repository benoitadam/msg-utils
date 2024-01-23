/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import type { SpawnOptions, ChildProcess } from 'child_process';
import type { Readable } from 'stream';
import { Msg } from '../msg/Msg';
import { IMsgHandler } from '../msg';
export type CmdValues = Record<string, any>;
export interface CmdOptions extends SpawnOptions {
    encoding?: BufferEncoding;
    timeout?: number;
    noListen?: boolean;
    logs?: boolean;
    onOut?: IMsgHandler<any>;
    onErr?: IMsgHandler<any>;
}
/**
 * Lit toutes les données d'un flux jusqu'à la fin et les renvoie sous forme de Buffer.
 *
 * @param {Readable} stream - Le flux à lire. Il doit être un objet conforme à l'interface Readable de Node.js.
 * @returns {Promise<Buffer>} Une promesse qui résout en un Buffer contenant toutes les données lues du flux.
 *                             Si le flux n'est pas fourni ou est invalide, la fonction renvoie `undefined`.
 */
export declare function readToEnd(stream: Readable): Promise<Buffer | undefined>;
/**
 * Convertit un tableau de morceaux de données en un seul buffer.
 * Si le tableau ne contient qu'un seul élément, cet élément est renvoyé directement.
 * Si le tableau contient plusieurs éléments, ils sont concaténés en un seul buffer.
 *
 * @param {any[]} chunks - Un tableau de morceaux de données (buffers, strings, etc.).
 * @returns {Buffer} Le buffer résultant de la concaténation des morceaux de données.
 */
export declare const chunksToBuffer: (chunks: any[]) => any;
/**
 * Concatène un tableau de fragments en une seule chaîne de caractères.
 *
 * @param {any[]} chunks - Un tableau contenant des éléments à concaténer.
 *                         Ces éléments doivent être convertissables en chaîne de caractères.
 * @returns {string} Une chaîne de caractères résultant de la concaténation de tous les éléments du tableau.
 */
export declare const chunksToString: (chunks: any[]) => string;
export declare class CmdReader {
    stream: Readable;
    readLength?: number;
    chunks: any[];
    data$?: Msg<any>;
    constructor(stream: Readable, encoding?: BufferEncoding);
    listen(): Msg<any>;
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
    /**
     *
     * @param command The command to execute "cd {name}"
     * @param inputs The values to replace. For { name: "test" }, "cd ../{name}" => "cd ../test"
     * @param options
     */
    constructor(command: string, inputs?: CmdValues | null | undefined, options?: CmdOptions);
    wait(): Promise<Cmd>;
    waitBuffer(): Promise<any>;
    waitString(): Promise<string | undefined>;
    kill(): void;
    end(): Promise<unknown>;
}
/**
 *
 * @param command The command to execute "cd {name}"
 * @param values The values to replace. For { name: "test" }, "cd ../{name}" => "cd ../test"
 * @param options
 * @returns
 */
export declare const cmd: (command: string, values?: CmdValues, options?: CmdOptions) => Promise<string | undefined>;
