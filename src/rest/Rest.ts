import { req } from './req';
import { RURL, RData, ROptions } from './interfaces';

export class Rest {
  constructor(public options: Partial<ROptions> = {}) {}

  req<T = any>(options: ROptions<T>) {
    return req<T>(options, this.options);
  }

  get<T = any>(url: RURL, options: ROptions<T> = {}) {
    return this.req<T>({ url, method: 'GET', ...options });
  }

  delete<T = any>(url: RURL, options: ROptions<T> = {}) {
    return this.req<T>({ url, method: 'DELETE', ...options });
  }

  post<T = any>(url: RURL, data?: RData, options: ROptions<T> = {}) {
    return this.req<T>({ url, method: 'POST', data, ...options });
  }

  patch<T = any>(url: RURL, data?: RData, options: ROptions<T> = {}) {
    return this.req<T>({ url, method: 'PATCH', data, ...options });
  }

  put<T = any>(url: RURL, data?: RData, options: ROptions<T> = {}) {
    return this.req<T>({ url, method: 'PUT', data, ...options });
  }

  upload<T = any>(
    url: RURL,
    name: string,
    file: File,
    fileName?: string,
    options: ROptions<T> = {},
  ) {
    const formData = new FormData();
    formData.append(name, file, fileName || file.name);
    return this.req<T>({ url, method: 'POST', formData, ...options });
  }
}

export const rest = new Rest();
