import { isRecord, parseJson } from '..';
import { toFormData } from '../cast/toFormData';
import { isFunction } from '../check/isFunction';
import { isString } from '../check/isString';
import { getJson } from '../json/getJson';
import { getModule } from '../module';
import { RestSend, RestContext, RestOptions, RestResponseType, RestHeaders } from './interfaces';

const acceptJson = 'application/json';
const acceptMap: Partial<Record<RestResponseType, string>> = {
  json: acceptJson,
  text: 'text/*; charset=utf-8',
  blob: '*/*',
  document: 'text/html, application/xhtml+xml, application/xml; q=0.9; charset=utf-8',
  arraybuffer: '*/*',
};

export class RestError<T = any> extends Error {
  name = 'RestError';
  constructor(public ctx: RestContext<T>) {
    super(ctx.error?.message || ctx.status);
  }
}

export const reqXHR = async <T = any>(ctx: RestContext<T>): Promise<void> => {
  try {
    const o = ctx.options;
    const _XMLHttpRequest = getModule('XMLHttpRequest');
    const xhr: XMLHttpRequest = o.xhr || (o.xhr = new _XMLHttpRequest());

    xhr.timeout = ctx.timeout || 20000;
    const responseType = (xhr.responseType = ctx.responseType || 'json');

    if (o.cors) xhr.withCredentials = true;

    xhr.open(ctx.method, ctx.url, true, o.username, o.password);

    if (o.cors) xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    for (const key in ctx.headers) {
      const val = ctx.headers[key];
      xhr.setRequestHeader(key, val);
    }

    xhr.addEventListener('progress', (event) => {
      ctx.event = event;
      if (o.onProgress) o.onProgress(event.loaded / event.total, ctx);
    });

    if (o.before) await o.before(ctx);
    await new Promise<void>((resolve) => {
      const cb = async () => {
        ctx.data = xhr.response;
        if (responseType === 'text') ctx.data = String(ctx.data) as any;
        if (responseType === 'json') ctx.data = parseJson(ctx.data, ctx.data) as any;
        ctx.response = xhr.response;
        ctx.status = xhr.status;
        ctx.headers = {};
        ctx.ok = xhr.status < 400;
        if (!ctx.ok) ctx.error = new Error(xhr.statusText);
        resolve();
      };
      xhr.onloadend = xhr.onerror = xhr.ontimeout = xhr.onabort = cb;
      xhr.send(ctx.body);
    });
  } catch (error) {
    ctx.error = error;
  }
};

export const reqFetch = async <T = any>(ctx: RestContext<T>): Promise<void> => {
  try {
    const o = ctx.options;
    const fetchRequest: RequestInit = (ctx.fetchInit = {
      body: ctx.body as any,
      headers: ctx.headers,
      method: ctx.method,
    });

    if (ctx.timeout) fetchRequest.signal = AbortSignal.timeout(ctx.timeout);

    if (o.before) await o.before(ctx);
    const response = await (o.fetch || getModule('fetch'))(ctx.url, fetchRequest);
    ctx.response = response;
    ctx.status = response.status;
    ctx.ok = response.ok;

    if (o.cast) {
      ctx.data = await o.cast(ctx);
      return;
    }

    switch (ctx.responseType) {
      case 'blob':
        ctx.data = (await response.blob()) as T;
        break;
      case 'json':
        const obj = (await response.json()) as T;
        ctx.data = parseJson(obj, obj);
        break;
      case 'text':
        ctx.data = (await response.text()) as T;
        break;
      case 'arraybuffer':
        ctx.data = (await response.arrayBuffer()) as T;
        break;
    }
  } catch (error) {
    ctx.error = error;
  }
};

export const req: RestSend = async <T = any>(
  options: RestOptions<T>,
  baseOptions?: RestOptions<T>,
): Promise<T> => {
  const o = baseOptions ? { ...baseOptions, ...options } : options;

  const headers: RestHeaders = {};
  const params = o.params || {};
  const responseType = o.responseType || 'json';
  const data = o.data;
  const url = new URL(o.url || '', o.baseUrl);
  const method = (o.method || 'GET').toUpperCase();
  const timeout = o.timeout;
  const formData = toFormData(o.formData);

  if (o.noCache) {
    headers['Cache-Control'] = 'no-cache, no-store, max-age=0';
    headers.Expires = 'Thu, 1 Jan 1970 00:00:00 GMT';
    headers.Pragma = 'no-cache';
    params.noCache = Date.now();
  }

  if (data) headers['Content-Type'] = 'application/json';
  // if (formData) headers['Content-Type'] = headers['Process-Data'] = 'multipart/form-data';

  headers.Accept = acceptMap[responseType] || acceptJson;

  const assignHeaders = (base: RestHeaders, value?: RestHeaders | (() => RestHeaders)) => {
    if (value) Object.assign(base, isFunction(value) ? value() : value);
  };

  assignHeaders(headers, baseOptions?.headers);
  assignHeaders(headers, options.headers);

  for (const key in params) {
    const v = params[key];
    url.searchParams.set(key, isString(v) ? v : getJson(v, String(v)));
  }

  const body = o.body || formData || getJson(data);

  const ctx = {
    options,
    url,
    method,
    responseType,
    params,
    headers,
    body,
    timeout,
    ok: false,
  } as RestContext<T>;

  try {
    const request =
      o.request || (!o.fetch && (o.xhr || getModule('XMLHttpRequest'))) ? reqXHR : reqFetch;
    await request(ctx as any);
    if (o.cast) ctx.data = await o.cast(ctx);
    if (o.after) await o.after(ctx);
  } catch (error) {
    ctx.error = error;
    ctx.ok = false;
  }

  if (ctx.error) throw new RestError(ctx);

  return ctx.data as T;
};
