import type { SpawnOptions, ChildProcess, spawn } from 'child_process';
import type { Readable } from 'stream';
import { Msg } from '../msg/Msg';
import { getModule } from '../module';
import { setTemplate } from '../string/setTemplate';
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
export async function readToEnd(stream: Readable) {
  const chunks: Buffer[] = [];
  if (!stream) return;
  for await (const chunk of stream) chunks.push(chunk);
  const data = chunks.length === 1 ? chunks[0] : Buffer.concat(chunks);
  return data;
}

/**
 * Convertit un tableau de morceaux de données en un seul buffer.
 * Si le tableau ne contient qu'un seul élément, cet élément est renvoyé directement.
 * Si le tableau contient plusieurs éléments, ils sont concaténés en un seul buffer.
 *
 * @param {any[]} chunks - Un tableau de morceaux de données (buffers, strings, etc.).
 * @returns {Buffer} Le buffer résultant de la concaténation des morceaux de données.
 */
export const chunksToBuffer = (chunks: any[]) =>
  chunks.length === 1 ? chunks[0] : Buffer.concat(chunks);

/**
 * Concatène un tableau de fragments en une seule chaîne de caractères.
 *
 * @param {any[]} chunks - Un tableau contenant des éléments à concaténer.
 *                         Ces éléments doivent être convertissables en chaîne de caractères.
 * @returns {string} Une chaîne de caractères résultant de la concaténation de tous les éléments du tableau.
 */
export const chunksToString = (chunks: any[]) => chunks.join('');

export class CmdReader {
  readLength?: number;
  chunks: any[] = [];
  data$?: Msg<any>;

  constructor(public stream: Readable, encoding?: BufferEncoding) {
    encoding && stream.setEncoding(encoding);
  }

  listen() {
    if (!this.data$) {
      const data$ = new Msg(undefined);
      this.data$ = data$;
      this.stream.on('data', (data) => {
        data$.set(data, true);
        this.chunks.push(data);
      });
    }
    return this.data$;
  }

  async read() {
    const stream = this.stream;
    const chunks: Buffer[] = [];
    const readLength = this.readLength;
    if (readLength) {
      const buffer = Buffer.alloc(readLength);
      // TODO
    } else {
      for await (const chunk of stream) chunks.push(chunk);
    }
    return chunks;
  }

  async readBuffer() {
    return chunksToBuffer(await this.read());
  }

  async readString() {
    return chunksToString(await this.read());
  }

  toBuffer() {
    return chunksToBuffer(this.chunks);
  }

  toString() {
    return chunksToString(this.chunks);
  }
}

export class Cmd {
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
  constructor(
    public command: string,
    public inputs?: CmdValues | null,
    public options: CmdOptions = {},
  ) {
    console.debug('Cmd', command, inputs, options);
    const { encoding, env, timeout, logs, onOut, onErr, ...spawnOptions } = options || {};
    let args = String(command).split(' ');
    if (inputs) args = args.map((a) => setTemplate(a, inputs));
    const nodeSpawn: typeof spawn = getModule('child_process').spawn;
    const { stdout, stderr } = (this.cp = nodeSpawn(args.shift() || '', args, {
      //stdio: 'inherit',
      stdio: 'pipe',
      cwd: process.cwd(),
      env: { ...process.env, ...env },
      shell: true,
      ...spawnOptions,
    }));
    if (stdout) {
      this.out = new CmdReader(stdout, encoding);
      if (logs) this.out.listen()?.on((msg) => console.log('cmd out', String(msg)));
      if (onOut) this.out.listen()?.on(onOut);
    }
    if (stderr) {
      this.err = new CmdReader(stderr, encoding);
      if (logs) this.err.listen()?.on((msg) => console.log('cmd err', String(msg)));
      if (onErr) this.err.listen()?.on(onErr);
    }
  }

  wait(): Promise<Cmd> {
    return new Promise((resolve, reject) => {
      const { timeout } = this.options;
      // this.cp.on('exit', () => resolve(this));
      // this.cp.stdout?.on('end', () => resolve(this));
      this.cp.on('close', () => resolve(this));
      this.cp.on('error', (error) => reject((this.error = error)));
      if (timeout) {
        setTimeout(() => {
          this.kill();
          reject((this.error = new Error('timeout')));
        }, timeout);
      }
    });
  }

  waitBuffer() {
    this.out?.listen();
    return this.wait().then(() => this.out?.toBuffer());
  }

  waitString() {
    this.out?.listen();
    return this.wait().then(() => this.out?.toString());
  }

  kill() {
    this.cp.kill('SIGINT');
  }

  end() {
    return new Promise((r) => this.cp.stdin?.end(r));
  }
}

/**
 *
 * @param command The command to execute "cd {name}"
 * @param values The values to replace. For { name: "test" }, "cd ../{name}" => "cd ../test"
 * @param options
 * @returns
 */
export const cmd = (
  command: string,
  values?: CmdValues,
  options?: CmdOptions,
): Promise<string | undefined> => {
  return new Cmd(command, values, options).waitString();
};
