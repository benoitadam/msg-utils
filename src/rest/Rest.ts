import { req } from './req';
import { RestURL, RestData, RestOptions } from './interfaces';
import { toFormData } from '../cast/toFormData';

export class Rest {
  constructor(public options: Partial<RestOptions> = {}) {}

  req<T = any>(options: RestOptions<T>) {
    return req<T>(options, this.options);
  }

  get<T = any>(url: RestURL, options: RestOptions<T> = {}) {
    return this.req<T>({ url, method: 'GET', ...options });
  }

  delete<T = any>(url: RestURL, options: RestOptions<T> = {}) {
    return this.req<T>({ url, method: 'DELETE', ...options });
  }

  post<T = any>(url: RestURL, data?: RestData, options: RestOptions<T> = {}) {
    return this.req<T>({ url, method: 'POST', data, ...options });
  }

  patch<T = any>(url: RestURL, data?: RestData, options: RestOptions<T> = {}) {
    return this.req<T>({ url, method: 'PATCH', data, ...options });
  }

  put<T = any>(url: RestURL, data?: RestData, options: RestOptions<T> = {}) {
    return this.req<T>({ url, method: 'PUT', data, ...options });
  }

  upload<T = any>(
    url: RestURL,
    name: string,
    file: File,
    fileName?: string,
    options: RestOptions<T> = {},
  ) {
    const formData = toFormData({});
    formData.append(name, file, fileName || file.name);
    return this.req<T>({ url, method: 'POST', formData, ...options });
  }
}

export const rest = new Rest();
