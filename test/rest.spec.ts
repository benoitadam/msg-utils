import { Rest, rest } from '../src';

describe('request', () => {
  globalThis.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

  test('constructor', () => {
    const r = new Rest({ baseUrl: 'test' });
    expect(r.options?.baseUrl).toEqual('test');
  });

  test('xhr', () => {
    expect(!!XMLHttpRequest).toBe(true);
    const xhr1 = new XMLHttpRequest();
    const xhr2 = rest.newXhr();
    expect(!!xhr1).toBe(true);
    expect(!!xhr2).toBe(true);
    expect(xhr1.send).toBeInstanceOf(Function);
    expect(xhr2.send).toBeInstanceOf(Function);
  });

  // test('xhr wikipedia', async () => {
  //     const response = await new Promise((resolve, reject) => {
  //         const xhr = new global.XMLHttpRequest();
  //         xhr.open('GET', 'https://wikipedia.org');
  //         xhr.responseType = 'text';
  //         expect(xhr.status).toBe(0);
  //         xhr.send();
  //         xhr.onload = resolve;
  //         xhr.onerror = reject;
  //     })
  //     expect(response).toBeInstanceOf(String);
  // });

  // test('get', async () => {
  //     const wikipedia = await rest.get('https://wikipedia.org', { responseType: 'text' });
  //     expect(wikipedia).toBeInstanceOf(String);
  // }, 20000);
});
