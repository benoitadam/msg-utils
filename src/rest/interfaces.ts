export type RestURL = string | URL;
export type RestMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
export type RestParams = Record<string, undefined | string | number | (string | number)[]>;
export type RestData = any;
export type RestHeaders = Record<string, string>;
export type RestBody = Document | XMLHttpRequestBodyInit | null | undefined;
export type RestResponseType = '' | 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';

export interface RestOptions<T = any> {
  url?: RestURL;
  method?: RestMethod;
  headers?: RestHeaders | (() => RestHeaders);
  baseUrl?: string;
  timeout?: number;
  params?: RestParams;
  data?: RestData;
  body?: RestBody;
  formData?: Record<string, any>|FormData;
  responseType?: RestResponseType;
  noCache?: boolean;
  xhr?: XMLHttpRequest;
  fetch?: (input: URL, init?: RequestInit) => Promise<Response>;
  before?: (ctx: RestContext<T>) => void | Promise<void>;
  after?: (ctx: RestContext<T>) => void | Promise<void>;
  cast?: (ctx: RestContext<T>) => T | Promise<T>;
  onProgress?: (progress: number, ctx: RestContext<T>) => void;
  request?: <T>(ctx: RestContext<T>) => Promise<T>;

  cors?: boolean;
  password?: string | null;
  username?: string | null;
}

export interface RestContext<T = any> {
  options: RestOptions<T>;

  url: URL;
  method: RestMethod;
  responseType: RestResponseType;
  params: RestParams;
  headers: RestHeaders;
  body: RestBody;
  timeout?: number;
  event?: any;
  status?: number;
  ok: boolean;
  data?: T;
  error?: any;

  xhr?: XMLHttpRequest;
  response?: Response;
  fetchInit?: RequestInit;
}

export type RestSend = <T = any>(
  options: RestOptions<T>,
  baseOptions?: RestOptions<T>,
) => Promise<T>;
