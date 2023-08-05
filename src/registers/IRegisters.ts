export interface IRegisters {
    crypto?: Partial<Crypto>;
    react?: any;
    localStorage?: Storage;
    XMLHttpRequest?: typeof XMLHttpRequest;
    fetch?: (input: URL, init?: RequestInit) => Promise<Response>;
}