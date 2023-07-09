import isFunction from '../check/isFunction';
import RestError from './RestError';
import { RestOptions, RestResponseType, RestURL } from './types';

const acceptJson = 'application/json; charset=utf-8';
const acceptMap: Partial<Record<RestResponseType, string>> = {
  json: acceptJson,
  text: 'text/*; charset=utf-8',
  blob: '*/*',
  document: 'text/html, application/xhtml+xml, application/xml; q=0.9; charset=utf-8',
  arraybuffer: '*/*',
};

export default <T = any>(
  xhr: XMLHttpRequest,
  url: RestURL,
  options: RestOptions<T> = {},
): Promise<T> => {
  return new Promise((resolve, reject) => {
    if (options.onInit) options.onInit(xhr);

    xhr.timeout = options.timeout || 20000;
    xhr.responseType = options.responseType || 'json';

    if (options.params || options.baseUrl) {
      const urlObj = new URL(url, options.baseUrl);
      if (options.params) {
        Object.entries(options.params).forEach((kv) => {
          const key = kv[0],
            val = kv[1];
          if (Array.isArray(val)) {
            urlObj.searchParams.delete(key);
            Object.values(val).forEach((p) => urlObj.searchParams.append(key, String(p)));
            return;
          }
          if (typeof val === 'object') {
            urlObj.searchParams.set(key, JSON.stringify(val));
            return;
          }
          urlObj.searchParams.set(key, String(val));
        });
      }
      url = urlObj;
    }

    xhr.open((options.method || 'POST').toUpperCase(), url);

    if (options.data) xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Accept', acceptMap[xhr.responseType] || acceptJson);
    if (options.headers) {
      const headers = isFunction(options.headers) ? options.headers() : options.headers;
      Object.entries(headers).forEach((kv) => xhr.setRequestHeader(kv[0], kv[1]));
    }

    if (options.onProgress) {
      const onProgress = options.onProgress;
      xhr.addEventListener('progress', (e) => onProgress(e, e.loaded / e.total));
    }

    const body = options.data ? JSON.stringify(options.data) : options.formData;

    xhr.onload = () => {
      if (xhr.status >= 400) throw xhr.status;

      if (options.onSuccess) options.onSuccess(xhr.response as T, xhr);

      // console.debug('Rest success', url, options, xhr.response);
      resolve(xhr.response as T);
    };

    xhr.onerror = () => {
      // console.debug('Rest error', url, options, err);
      const error = new RestError(xhr);
      if (options.onError) options.onError(error, xhr);
      reject(error);
    };

    if (options.send) options.send(xhr, body);
    else xhr.send(body);
  });
};
