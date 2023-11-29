import type { SpawnOptions, ChildProcess, spawn } from 'child_process';
import type { Readable } from 'stream';
import { Msg } from '../msg/Msg';
import { getModule } from '../module';

export type CmdValues = Record<string, any>;

export interface CmdOptions extends SpawnOptions {
  encoding?: BufferEncoding;
  timeout?: number;
  noListen?: boolean;
}

export async function readToEnd(stream: Readable) {
  const chunks: Buffer[] = [];
  if (!stream) return;
  for await (const chunk of stream) chunks.push(chunk);
  const data = chunks.length === 1 ? chunks[0] : Buffer.concat(chunks);
  return data;
}

export const chunksToBuffer = (chunks: any[]) =>
  chunks.length === 1 ? chunks[0] : Buffer.concat(chunks);
export const chunksToString = (chunks: any[]) => chunks.join('');

export class CmdReader {
  readLength?: number;
  chunks: any[] = [];
  data$?: Msg<any>;

  constructor(public stream: Readable, encoding?: BufferEncoding) {
    encoding && stream.setEncoding(encoding);
  }

  listen() {
    if (this.data$) return this.data$;
    const data$ = new Msg(undefined);
    this.data$ = data$;
    this.stream.on('data', (data) => {
      data$.set(data, true);
      this.chunks.push(data);
    });
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

  constructor(
    public command: string,
    public inputs?: CmdValues | null,
    public options: CmdOptions = {},
  ) {
    console.debug('Cmd', command, inputs, options);
    const { encoding, env, timeout, ...spawnOptions } = options || {};
    let args = String(command).split(' ');
    if (inputs) args = args.map((a) => a.replace(/\{(\w+)\}/g, (s, k) => String(inputs[k]) || s));
    const nodeSpawn: typeof spawn = getModule('child_process').spawn;
    const { stdout, stderr } = (this.cp = nodeSpawn(args.shift() || '', args, {
      //stdio: 'inherit',
      stdio: 'pipe',
      cwd: process.cwd(),
      env: { ...process.env, ...env },
      shell: true,
      ...spawnOptions,
    }));
    if (stdout) this.out = new CmdReader(stdout, encoding);
    if (stderr) this.err = new CmdReader(stderr, encoding);
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

export const cmd = (
  command: string,
  values?: CmdValues,
  options?: CmdOptions,
): Promise<string | undefined> => {
  return new Cmd(command, values, options).waitString();
};
