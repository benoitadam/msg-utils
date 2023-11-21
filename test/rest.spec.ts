import { Rest, getJson, parseJson, registers, rest } from '../src';
import http from 'node:http';

registers.XMLHttpRequest = require('xmlhttprequest-ssl');
registers.fetch = require('node-fetch');

const PORT = Math.round(Math.random() * 10000);
const HOSTNAME = '127.0.0.1';
const BASE_URL = `http://${HOSTNAME}:${PORT}`;

describe('rest', () => {
  const server = http.createServer((req, res) => {
    console.debug('server.listener', req.url);
    const ctx = {
      method: req.method,
      body: '',
      data: {} as any,
    };
    req.on('data', (chunk) => {
      ctx.body += chunk;
    });
    req.on('end', () => {
      ctx.data = parseJson(ctx.body);
      console.log('server.listener', ctx);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(getJson(ctx));
      res.end();
    });
  });

  server.listen(PORT, HOSTNAME, () => {
    console.debug('server.listen');
  });

  afterAll(async () => {
    await new Promise(r => server.close(r));
  });

  test('test-server', async () => {
    console.debug('server.req');

    const res = await fetch(BASE_URL);
    const data: any = await res.json();

    expect(data?.method).toEqual('GET');
  });

  test('constructor', () => {
    const r = new Rest({ baseUrl: BASE_URL });
    expect(r.options?.baseUrl).toEqual(BASE_URL);
  });

  test('xhr get', async () => {
    const data = await rest.get(BASE_URL);
    console.debug('xhr get', data, String(data));
    expect(data?.method).toEqual('GET');
  });

  test('xhr post', async () => {
    const data = await rest.post(BASE_URL, { a: 2 });
    expect(data?.method).toEqual('POST');
    expect(data?.data?.a).toEqual(2);
  });

  test('fetch get', async () => {
    const data = await rest.get(BASE_URL, {
      fetch,
      after: (ctx) => {
        expect(String(ctx.response)).toEqual('[object Response]');
      },
    });
    expect(data?.method).toEqual('GET');
  });

  test('fetch post', async () => {
    const data = await rest.post(BASE_URL, { a: 2 }, { fetch });
    expect(data?.method).toEqual('POST');
    expect(data?.data?.a).toEqual(2);
  });
});
