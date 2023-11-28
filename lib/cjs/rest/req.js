"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.req = exports.reqFetch = exports.reqXHR = exports.RestError = void 0;
const __1 = require("..");
const isFunction_1 = require("../check/isFunction");
const isString_1 = require("../check/isString");
const getJson_1 = require("../json/getJson");
const module_1 = require("../module/module");
const acceptJson = 'application/json';
const acceptMap = {
    json: acceptJson,
    text: 'text/*; charset=utf-8',
    blob: '*/*',
    document: 'text/html, application/xhtml+xml, application/xml; q=0.9; charset=utf-8',
    arraybuffer: '*/*',
};
class RestError extends Error {
    constructor(ctx) {
        var _a;
        super(((_a = ctx.error) === null || _a === void 0 ? void 0 : _a.message) || ctx.status);
        this.ctx = ctx;
        this.name = 'RestError';
    }
}
exports.RestError = RestError;
const reqXHR = async (ctx) => {
    try {
        const o = ctx.options;
        const _XMLHttpRequest = (0, module_1.getModule)('XMLHttpRequest');
        const xhr = o.xhr || (o.xhr = new _XMLHttpRequest());
        xhr.timeout = ctx.timeout || 20000;
        const responseType = (xhr.responseType = ctx.responseType || 'json');
        if (o.cors)
            xhr.withCredentials = true;
        xhr.open(ctx.method, ctx.url, true, o.username, o.password);
        if (o.cors)
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        for (const key in ctx.headers) {
            const val = ctx.headers[key];
            xhr.setRequestHeader(key, val);
        }
        xhr.addEventListener('progress', (event) => {
            ctx.event = event;
            if (o.onProgress)
                o.onProgress(event.loaded / event.total, ctx);
        });
        if (o.before)
            await o.before(ctx);
        await new Promise((resolve) => {
            const cb = async () => {
                ctx.data = xhr.response;
                if (responseType === 'text')
                    ctx.data = String(ctx.data);
                if (responseType === 'json')
                    ctx.data = (0, __1.parseJson)(ctx.data, ctx.data);
                ctx.response = xhr.response;
                ctx.status = xhr.status;
                ctx.headers = {};
                ctx.ok = xhr.status < 400;
                if (!ctx.ok)
                    ctx.error = new Error(xhr.statusText);
                resolve();
            };
            xhr.onloadend = xhr.onerror = xhr.ontimeout = xhr.onabort = cb;
            xhr.send(ctx.body);
        });
    }
    catch (error) {
        ctx.error = error;
    }
};
exports.reqXHR = reqXHR;
const reqFetch = async (ctx) => {
    try {
        const o = ctx.options;
        const fetchRequest = (ctx.fetchInit = {
            body: ctx.body,
            headers: ctx.headers,
            method: ctx.method,
        });
        if (ctx.timeout)
            fetchRequest.signal = AbortSignal.timeout(ctx.timeout);
        if (o.before)
            await o.before(ctx);
        const response = await (o.fetch || (0, module_1.getModule)('fetch'))(ctx.url, fetchRequest);
        ctx.response = response;
        ctx.status = response.status;
        ctx.ok = response.ok;
        if (o.cast) {
            ctx.data = await o.cast(ctx);
            return;
        }
        switch (ctx.responseType) {
            case 'blob':
                ctx.data = (await response.blob());
                break;
            case 'json':
                const obj = (await response.json());
                ctx.data = (0, __1.parseJson)(obj, obj);
                break;
            case 'text':
                ctx.data = (await response.text());
                break;
            case 'arraybuffer':
                ctx.data = (await response.arrayBuffer());
                break;
        }
    }
    catch (error) {
        ctx.error = error;
    }
};
exports.reqFetch = reqFetch;
const req = async (options, baseOptions) => {
    const o = baseOptions ? { ...baseOptions, ...options } : options;
    const headers = {};
    const params = o.params || {};
    const responseType = o.responseType || 'json';
    const data = o.data;
    const url = new URL(o.url || '', o.baseUrl);
    if (o.noCache) {
        headers['Cache-Control'] = 'no-cache, no-store, max-age=0';
        headers.Expires = 'Thu, 1 Jan 1970 00:00:00 GMT';
        headers.Pragma = 'no-cache';
        params.noCache = Date.now();
    }
    if (data)
        headers['Content-Type'] = 'application/json';
    headers.Accept = acceptMap[responseType] || acceptJson;
    const oHeaders = (0, isFunction_1.isFunction)(o.headers) ? o.headers() : o.headers;
    if (oHeaders)
        Object.assign(headers, oHeaders);
    for (const key in params) {
        const v = params[key];
        url.searchParams.set(key, (0, isString_1.isString)(v) ? v : (0, getJson_1.getJson)(v, String(v)));
    }
    const body = o.body || data ? (0, getJson_1.getJson)(data) : o.formData;
    const ctx = {
        options,
        url,
        method: (o.method || 'GET').toUpperCase(),
        responseType,
        params,
        headers,
        body,
        timeout: o.timeout,
        // event: undefined,
        // response: undefined,
        // status: undefined,
        ok: false,
        // data: undefined,
        // error: undefined,
    };
    try {
        const request = o.request || (!o.fetch && (o.xhr || (0, module_1.getModule)('XMLHttpRequest'))) ? exports.reqXHR : exports.reqFetch;
        await request(ctx);
        if (o.cast)
            ctx.data = await o.cast(ctx);
        if (o.after)
            await o.after(ctx);
    }
    catch (error) {
        ctx.error = error;
        ctx.ok = false;
    }
    if (ctx.error)
        throw new RestError(ctx);
    return ctx.data;
};
exports.req = req;
