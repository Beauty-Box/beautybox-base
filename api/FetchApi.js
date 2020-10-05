let globalFetch = null;

if (typeof window !== 'undefined') {
    console.log('client');
    globalFetch = window.fetch;
} else if (typeof global !== 'undefined') {
    console.log('server');
    globalFetch = require('node-fetch');
} else {
    new TypeError('class Fetch is not defined');
}

export class FetchApi {
    constructor(baseUrl, module) {
        this.BASE_URL = baseUrl;
        this.MODULE = module;
    }
    _genHeaders(data) {
        let opt = {
            // Authorization: 'bearer ' + window.localStorage.getItem('access_token'),
        };
        if (toString.call(data).slice(8, -1) !== 'FormData') {
            opt['content-type'] = 'application/json';
        }
        return opt;
    }
    _genBody(data, method) {
        let headers = this._genHeaders(data);
        let body = {
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
}
