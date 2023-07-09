const getMsg = (r: any) => String((r && r.message) || r);
const getCode = (r: any) => String(r && r.code);

export default class RestError extends Error {
  code: string;
  constructor(public xhr: XMLHttpRequest) {
    super(getMsg(xhr.response) || xhr.statusText);
    this.code = getCode(xhr.response) || String(xhr.status);
  }
}
