"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rest = exports.Rest = void 0;
const req_1 = require("./req");
const toFormData_1 = require("../cast/toFormData");
class Rest {
    options;
    constructor(options = {}) {
        this.options = options;
    }
    req(options) {
        return (0, req_1.req)(options, this.options);
    }
    get(url, options = {}) {
        return this.req({ url, method: 'GET', ...options });
    }
    delete(url, options = {}) {
        return this.req({ url, method: 'DELETE', ...options });
    }
    post(url, data, options = {}) {
        return this.req({ url, method: 'POST', data, ...options });
    }
    patch(url, data, options = {}) {
        return this.req({ url, method: 'PATCH', data, ...options });
    }
    put(url, data, options = {}) {
        return this.req({ url, method: 'PUT', data, ...options });
    }
    upload(url, name, file, fileName, options = {}) {
        const formData = (0, toFormData_1.toFormData)({});
        formData.append(name, file, fileName || file.name);
        return this.req({ url, method: 'POST', formData, ...options });
    }
}
exports.Rest = Rest;
exports.rest = new Rest();
