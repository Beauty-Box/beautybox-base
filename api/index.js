import { BaseApi } from './BaseApi';
import { FetchApi as Provider } from './FetchApi';

export class Api extends BaseApi {
    constructor(baseUrl, module) {
        super(baseUrl, module);
        this._setProvider();
    }
    _setProvider() {
        this.provider = new Provider(this.baseUrl, this.module);
    }
    get(url, data) {
        return this.provider
            .res(url, data, 'get')
            .then((response) =>
                this.test(response)
                    .then((result) => result)
                    .catch((result) => this.redirectTo(result))
            )
            .catch((result) => this.redirectTo(result));
    }
    delete(url, data) {
        return this.provider
            .res(url, data, 'delete')
            .then((response) =>
                this.test(response)
                    .then((result) => result)
                    .catch((result) => this.redirectTo(result))
            )
            .catch((result) => this.redirectTo(result));
    }
    post(url, data) {
        return this.provider
            .res(url, data, 'post')
            .then((response) =>
                this.test(response)
                    .then((result) => result)
                    .catch((result) => this.redirectTo(result))
            )
            .catch((result) => this.redirectTo(result));
    }
    put(url, data) {
        return this.provider
            .res(url, data, 'put')
            .then((response) =>
                this.test(response)
                    .then((result) => result)
                    .catch((result) => this.redirectTo(result))
            )
            .catch((result) => this.redirectTo(result));
    }
    redirectTo(result) {
        if (result.status >= 500) {
            document.dispatchEvent(new Event('server-error'));
            return result;
        }
        if (result.status === 400) {
            document.dispatchEvent(new Event('bad-request'));
            return result;
        }
        if (result.status === 401) {
            window.location.replace(
                `${window.location.origin}/auth/sign-in?from=${window.location.href}`
            );
        }
        if (result.status === 403) {
            document.dispatchEvent(new Event('forbidden'));
            return result;
        }
        if (result.status === 404) {
            document.dispatchEvent(new Event('not-found'));
            return result;
        }
        if (result.status !== 422) {
            document.dispatchEvent(new Event('unknown-error'));
            return result;
        }
        return result;
    }
}
