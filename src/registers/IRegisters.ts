export interface IRegisters {
  child_process?: { spawn: any };
  crypto: Partial<Crypto>;
  react: any;
  localStorage: Storage;
  XMLHttpRequest: typeof XMLHttpRequest;
  fetch: (input: URL, init?: RequestInit) => Promise<Response>;
}
