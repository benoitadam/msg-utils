export default class RestError extends Error {
    xhr: XMLHttpRequest;
    code: string;
    constructor(xhr: XMLHttpRequest);
}
