let globalFetch = null;

if (typeof window !== 'undefined') {
    globalFetch = window.fetch;
} else if (typeof global !== 'undefined') {
    globalFetch = require('node-fetch');
} else {
    new TypeError('class Fetch is not defined');
}

export class FetchApi {
    constructor(baseUrl, module, token) {
        this.BASE_URL = baseUrl;
        this.MODULE = module;
        this.token = token || '';
    }
    _genHeaders(data) {
        const opt = {};
        if (this.token) {
            opt['Authorization'] = 'bearer ' + this.token;
        }
        if (toString.call(data).slice(8, -1) !== 'FormData') {
            opt['content-type'] = 'application/json';
        }
        return opt;
    }
    _genBody(data, method) {
        const headers = this._genHeaders(data);
        const body = {
            method,
            headers: new Headers(headers),
        };
        if (typeof data !== 'undefined') {
            body.body =
                toString.call(data).slice(8, -1) === 'FormData' ? data : JSON.stringify(data);
        }
        return body;
    }
    res(url, data, method) {
        return fetch(`${this.BASE_URL}/api/${this.MODULE}` + url, this._genBody(data, method));
    }
    updateToken(token) {
        this.token = token;
    }
}
