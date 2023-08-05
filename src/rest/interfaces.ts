export type RURL = string | URL;
export type RMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
export type RParams = Record<string, undefined | string | number | (string | number)[]>;
export type RData = any;
export type RHeaders = Record<string, string>;
export type RBody = Document | XMLHttpRequestBodyInit | null | undefined;
export type RResponseType = '' | 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';

export interface ROptions<T = any> {
  url?: RURL;
  method?: RMethod;
  headers?: RHeaders|(() => RHeaders);
  baseUrl?: string;
  timeout?: number;
  params?: RParams;
  data?: RData;
  body?: RBody;
  formData?: FormData;
  responseType?: RResponseType;
  noCache?: boolean;
  xhr?: XMLHttpRequest;
  fetch?: (input: URL, init?: RequestInit) => Promise<Response>;
  before?: (ctx: RContext<T>) => void | Promise<void>;
  after?: (ctx: RContext<T>) => void | Promise<void>;
  cast?: (ctx: RContext<T>) => T | Promise<T>;
  onProgress?: (value: number, ctx: RContext<T>) => void;
  request?: <T>(ctx: RContext<T>) => Promise<T>;
}

export interface RContext<T = any> {
  options: ROptions<T>;

  url: URL;
  method: RMethod;
  responseType: RResponseType;
  params: RParams;
  headers: RHeaders;
  body: RBody;
  timeout?: number;
  event?: any;
  status?: number;
  ok: boolean;
  data?: T;
  error?: any;

  xhr: XMLHttpRequest;
  response?: Response;
}

export type RSend = <T = any>(options: ROptions<T>, baseOptions?: ROptions<T>) => Promise<T>;
