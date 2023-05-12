function fetchFactory() {
    if (typeof window !== 'undefined') {
        return window.fetch || require('node-fetch');
    } else if (typeof global !== 'undefined') {
        return require('node-fetch');
    } else {
        new TypeError('class Fetch is not defined');
    }
}

export class FetchApi {
    constructor(baseUrl, module, token) {
        this.BASE_URL = baseUrl;
        this.MODULE = module;
        this.token = token || '';
    }
    _genHeaders(data) {
        const opt = {};
        console.log('get authorization header', this.token);
        if (this.token) {
            opt['Authorization'] = 'Bearer ' + this.token;
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
    res(url, data, method, module = '') {
        const fetch = fetchFactory();
        return fetch(
            `${this.BASE_URL}/api/${module ? module : this.MODULE}` + url,
            this._genBody(data, method)
        );
    }
    updateToken(token) {
        this.token = token;
    }
}
