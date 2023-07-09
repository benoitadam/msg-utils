import type RestError from './RestError';

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
  send?: (xhr: XMLHttpRequest, body: string | FormData | undefined) => void;
  onInit?: (xhr: XMLHttpRequest) => void;
  onError?: (error: RestError, xhr: XMLHttpRequest) => void;
  onSuccess?: (data: T, xhr: XMLHttpRequest) => void;
  onProgress?: (e: ProgressEvent<XMLHttpRequestEventTarget>, progress: number) => void;
};
