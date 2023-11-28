"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmd = exports.Cmd = exports.CmdReader = exports.chunksToString = exports.chunksToBuffer = exports.readToEnd = void 0;
const Msg_1 = require("../msg/Msg");
const module_1 = require("../module");
async function readToEnd(stream) {
    const chunks = [];
    if (!stream)
        return;
    for await (const chunk of stream)
        chunks.push(chunk);
    const data = chunks.length === 1 ? chunks[0] : Buffer.concat(chunks);
    return data;
}
exports.readToEnd = readToEnd;
const chunksToBuffer = (chunks) => chunks.length === 1 ? chunks[0] : Buffer.concat(chunks);
exports.chunksToBuffer = chunksToBuffer;
const chunksToString = (chunks) => chunks.join('');
exports.chunksToString = chunksToString;
class CmdReader {
    stream;
    readLength;
    chunks = [];
    data$;
    constructor(stream, encoding) {
        this.stream = stream;
        encoding && stream.setEncoding(encoding);
    }
    listen() {
        if (this.data$)
            return this.data$;
        const data$ = new Msg_1.Msg(undefined);
        this.data$ = data$;
        this.stream.on('data', (data) => {
            data$.set(data, true);
            this.chunks.push(data);
        });
    }
    async read() {
        const stream = this.stream;
        const chunks = [];
        const readLength = this.readLength;
        if (readLength) {
            const buffer = Buffer.alloc(readLength);
            // TODO
        }
        else {
            for await (const chunk of stream)
                chunks.push(chunk);
        }
        return chunks;
    }
    async readBuffer() {
        return (0, exports.chunksToBuffer)(await this.read());
    }
    async readString() {
        return (0, exports.chunksToString)(await this.read());
    }
    toBuffer() {
        return (0, exports.chunksToBuffer)(this.chunks);
    }
    toString() {
        return (0, exports.chunksToString)(this.chunks);
    }
}
exports.CmdReader = CmdReader;
class Cmd {
    command;
    inputs;
    options;
    cp;
    out;
    err;
    code;
    error;
    constructor(command, inputs, options = {}) {
        this.command = command;
        this.inputs = inputs;
        this.options = options;
        console.debug('Cmd', command, inputs, options);
        const { encoding, env, timeout, ...spawnOptions } = options || {};
        let args = String(command).split(' ');
        if (inputs)
            args = args.map((a) => a.replace(/\{(\w+)\}/g, (s, k) => String(inputs[k]) || s));
        const nodeSpawn = (0, module_1.getModule)('child_process').spawn;
        const { stdout, stderr } = (this.cp = nodeSpawn(args.shift() || '', args, {
            //stdio: 'inherit',
            stdio: 'pipe',
            cwd: process.cwd(),
            env: { ...process.env, ...env },
            shell: true,
            ...spawnOptions,
        }));
        if (stdout)
            this.out = new CmdReader(stdout, encoding);
        if (stderr)
            this.err = new CmdReader(stderr, encoding);
    }
    wait() {
        return new Promise((resolve, reject) => {
            const { timeout } = this.options;
            // this.cp.on('exit', () => resolve(this));
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
exports.Cmd = Cmd;
const cmd = (command, values, options) => {
    return new Cmd(command, values, options).waitString();
};
exports.cmd = cmd;
