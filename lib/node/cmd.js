"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmd = exports.Cmd = exports.CmdReader = exports.chunksToString = exports.chunksToBuffer = exports.readToEnd = void 0;
const Msg_1 = require("../msg/Msg");
const module_1 = require("../module");
const setTemplate_1 = require("../string/setTemplate");
/**
 * Lit toutes les données d'un flux jusqu'à la fin et les renvoie sous forme de Buffer.
 *
 * @param {Readable} stream - Le flux à lire. Il doit être un objet conforme à l'interface Readable de Node.js.
 * @returns {Promise<Buffer>} Une promesse qui résout en un Buffer contenant toutes les données lues du flux.
 *                             Si le flux n'est pas fourni ou est invalide, la fonction renvoie `undefined`.
 */
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
/**
 * Convertit un tableau de morceaux de données en un seul buffer.
 * Si le tableau ne contient qu'un seul élément, cet élément est renvoyé directement.
 * Si le tableau contient plusieurs éléments, ils sont concaténés en un seul buffer.
 *
 * @param {any[]} chunks - Un tableau de morceaux de données (buffers, strings, etc.).
 * @returns {Buffer} Le buffer résultant de la concaténation des morceaux de données.
 */
const chunksToBuffer = (chunks) => chunks.length === 1 ? chunks[0] : Buffer.concat(chunks);
exports.chunksToBuffer = chunksToBuffer;
/**
 * Concatène un tableau de fragments en une seule chaîne de caractères.
 *
 * @param {any[]} chunks - Un tableau contenant des éléments à concaténer.
 *                         Ces éléments doivent être convertissables en chaîne de caractères.
 * @returns {string} Une chaîne de caractères résultant de la concaténation de tous les éléments du tableau.
 */
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
        if (!this.data$) {
            const data$ = new Msg_1.Msg(undefined);
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
    /**
     *
     * @param command The command to execute "cd {name}"
     * @param inputs The values to replace. For { name: "test" }, "cd ../{name}" => "cd ../test"
     * @param options
     */
    constructor(command, inputs, options = {}) {
        this.command = command;
        this.inputs = inputs;
        this.options = options;
        console.debug('Cmd', command, inputs, options);
        const { encoding, env, timeout, logs, onOut, onErr, ...spawnOptions } = options || {};
        let args = String(command).split(' ');
        if (inputs)
            args = args.map((a) => (0, setTemplate_1.setTemplate)(a, inputs));
        const nodeSpawn = (0, module_1.getModule)('child_process').spawn;
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
            if (logs)
                this.out.listen()?.on((msg) => console.log('cmd out', String(msg)));
            if (onOut)
                this.out.listen()?.on(onOut);
        }
        if (stderr) {
            this.err = new CmdReader(stderr, encoding);
            if (logs)
                this.err.listen()?.on((msg) => console.log('cmd err', String(msg)));
            if (onErr)
                this.err.listen()?.on(onErr);
        }
    }
    wait() {
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
exports.Cmd = Cmd;
/**
 *
 * @param command The command to execute "cd {name}"
 * @param values The values to replace. For { name: "test" }, "cd ../{name}" => "cd ../test"
 * @param options
 * @returns
 */
const cmd = (command, values, options) => {
    return new Cmd(command, values, options).waitString();
};
exports.cmd = cmd;
