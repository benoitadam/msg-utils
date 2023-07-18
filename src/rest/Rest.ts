import { isFunction } from '../check/isFunction';

export type RestMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
export type RestURL = string | URL;
export type RestResponse<T = any> = { ok: boolean; data?: T; xhr: XMLHttpRequest };
export type RestParams = Record<string, undefined | string | number | (string | number)[]>;
export type RestData = any;
export type RestResponseType = XMLHttpRequestResponseType; // | 'json' | 'text' | 'html' | 'blob' | 'stream';
export type RestOptions<T = any> = {
  method?: RestMethod;
  headers?: Record<string, string> | (() => Record<string, string>);
  baseUrl?: string;
  timeout?: number;
  params?: RestParams;
  data?: RestData;
  formData?: FormData;
  responseType?: XMLHttpRequestResponseType;
  noCache?: boolean;
  send?: (xhr: XMLHttpRequest, body: string | FormData | undefined) => void;
  onInit?: (xhr: XMLHttpRequest) => void;
  onError?: (error: RestError, xhr: XMLHttpRequest) => void;
  onSuccess?: (data: T, xhr: XMLHttpRequest) => void;
  onProgress?: (e: ProgressEvent<XMLHttpRequestEventTarget>, progress: number) => void;
};

const acceptJson = 'application/json; charset=utf-8';
const acceptMap: Partial<Record<RestResponseType, string>> = {
  json: acceptJson,
  text: 'text/*; charset=utf-8',
  blob: '*/*',
  document: 'text/html, application/xhtml+xml, application/xml; q=0.9; charset=utf-8',
  arraybuffer: '*/*',
};

const xhrRest = <T = any>(
  xhr: XMLHttpRequest,
  url: RestURL,
  options: RestOptions<T> = {},
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const {
      onInit,
      baseUrl,
      onProgress,
      onError,
      onSuccess,
      send,
      data,
      timeout,
      responseType,
      noCache,
      method,
      formData,
    } = options;

    let { headers, params } = options;

    if (onInit) onInit(xhr);

    xhr.timeout = timeout || 20000;
    xhr.responseType = responseType || 'json';

    if (isFunction(headers)) headers = headers();

    if (noCache) {
      headers = {
        'Cache-Control': 'no-cache, no-store, max-age=0',
        Expires: 'Thu, 1 Jan 1970 00:00:00 GMT',
        Pragma: 'no-cache',
        ...headers,
      };
      params = {
        noCache: Date.now(),
        ...params,
      };
    }

    if (params || baseUrl) {
      const urlObj = new URL(url, baseUrl);
      if (params) {
        const searchParams = urlObj.searchParams;
        Object.entries(params).forEach((kv) => {
          const key = kv[0],
            val = kv[1];
          if (val === null) {
            searchParams.delete(key);
          }
          if (Array.isArray(val)) {
            searchParams.delete(key);
            Object.values(val).forEach((p) => searchParams.append(key, String(p)));
            return;
          }
          if (typeof val === 'object') {
            searchParams.set(key, JSON.stringify(val));
            return;
          }
          searchParams.set(key, String(val));
        });
      }
      url = urlObj;
    }

    xhr.open((method || 'POST').toUpperCase(), url);

    if (data) xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Accept', acceptMap[xhr.responseType] || acceptJson);

    if (headers) {
      Object.entries(headers).forEach((kv) => xhr.setRequestHeader(kv[0], kv[1]));
    }

    if (onProgress) {
      xhr.addEventListener('progress', (e) => onProgress(e, e.loaded / e.total));
    }

    const body = data ? JSON.stringify(data) : formData;

    xhr.onloadend = () => {
      if (xhr.status >= 400) {
        const error = new RestError(xhr);
        if (onError) onError(error, xhr);
        reject(error);
      }

      if (onSuccess) onSuccess(xhr.response as T, xhr);

      // console.debug('Rest success', url, options, xhr.response);
      resolve(xhr.response as T);
    };

    xhr.onerror = () => {
      // console.debug('Rest error', url, options, err);
      const error = new RestError(xhr);
      if (onError) onError(error, xhr);
      reject(error);
    };

    if (send) send(xhr, body);
    else xhr.send(body);
  });
};

const getMsg = (r: any) => String((r && r.message) || r);
const getCode = (r: any) => String(r && r.code);

export class RestError extends Error {
  code: string;
  constructor(public xhr: XMLHttpRequest) {
    super(getMsg(xhr.response) || xhr.statusText);
    this.code = getCode(xhr.response) || String(xhr.status);
  }
}

export class Rest {
  constructor(public options?: RestOptions) {}

  new(options?: RestOptions) {
    return new Rest(options);
  }

  newXhr() {
    return new globalThis.XMLHttpRequest();
  }

  send<T = any>(url: RestURL, options: RestOptions<T> = {}) {
    const xhr = this.newXhr();
    return xhrRest<T>(xhr, url, this.options ? { ...this.options, ...options } : options);
  }

  get<T = any>(url: RestURL, options: RestOptions<T> = {}) {
    return this.send<T>(url, { method: 'GET', ...options });
  }

  delete<T = any>(url: RestURL, options: RestOptions<T> = {}) {
    return this.send<T>(url, { method: 'DELETE', ...options });
  }

  post<T = any>(url: RestURL, data?: RestData, options: RestOptions<T> = {}) {
    return this.send<T>(url, { method: 'POST', data, ...options });
  }

  patch<T = any>(url: RestURL, data?: RestData, options: RestOptions<T> = {}) {
    return this.send<T>(url, { method: 'PATCH', data, ...options });
  }

  put<T = any>(url: RestURL, data?: RestData, options: RestOptions<T> = {}) {
    return this.send<T>(url, { method: 'PUT', data, ...options });
  }

  upload<T = any>(
    url: RestURL,
    name: string,
    file: File,
    fileName?: string,
    options: RestOptions<T> = {},
  ) {
    const formData = new FormData();
    formData.append(name, file, fileName || file.name);
    return this.send<T>(url, { method: 'POST', formData, ...options });
  }
}

export const rest = new Rest();
