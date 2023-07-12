import xhrRest from './xhrRest';
import { RestData, RestOptions, RestURL } from './types';

export default class Rest {
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
