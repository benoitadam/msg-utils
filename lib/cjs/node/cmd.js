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
    constructor(stream, encoding) {
        this.stream = stream;
        this.chunks = [];
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
    /**
     *
     * @param command The command to execute "cd {name}"
     * @param inputs The values to replace. For { name: "test" }, "cd ../{name}" => "cd ../test"
     * @param options
     */
    constructor(command, inputs, options = {}) {
        var _a, _b, _c, _d;
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
                (_a = this.out.listen()) === null || _a === void 0 ? void 0 : _a.on((msg) => console.log('cmd out', String(msg)));
            if (onOut)
                (_b = this.out.listen()) === null || _b === void 0 ? void 0 : _b.on(onOut);
        }
        if (stderr) {
            this.err = new CmdReader(stderr, encoding);
            if (logs)
                (_c = this.err.listen()) === null || _c === void 0 ? void 0 : _c.on((msg) => console.log('cmd err', String(msg)));
            if (onErr)
                (_d = this.err.listen()) === null || _d === void 0 ? void 0 : _d.on(onErr);
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
        var _a;
        (_a = this.out) === null || _a === void 0 ? void 0 : _a.listen();
        return this.wait().then(() => { var _a; return (_a = this.out) === null || _a === void 0 ? void 0 : _a.toBuffer(); });
    }
    waitString() {
        var _a;
        (_a = this.out) === null || _a === void 0 ? void 0 : _a.listen();
        return this.wait().then(() => { var _a; return (_a = this.out) === null || _a === void 0 ? void 0 : _a.toString(); });
    }
    kill() {
        this.cp.kill('SIGINT');
    }
    end() {
        return new Promise((r) => { var _a; return (_a = this.cp.stdin) === null || _a === void 0 ? void 0 : _a.end(r); });
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
