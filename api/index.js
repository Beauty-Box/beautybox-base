import { TestStatus } from './TestStatus';
import { FetchApi as Provider } from './FetchApi';

class Api extends TestStatus {
    constructor(baseUrl, module, token) {
        super();
        this.baseUrl = baseUrl;
        this.module = module;
        this._setProvider(baseUrl, module, token);
    }
    _setProvider(baseUrl, module, token) {
        this.provider = new Provider(baseUrl, module, token);
    }
    get(url, data) {
        return this.provider
            .res(url, data, 'get')
            .then(response =>
                this.test(response)
                    .then(result => result)
                    .catch(result => this.redirectTo(result))
            )
            .catch(result => this.redirectTo(result));
    }
    delete(url, data) {
        return this.provider
            .res(url, data, 'delete')
            .then(response =>
                this.test(response)
                    .then(result => result)
                    .catch(result => this.redirectTo(result))
            )
            .catch(result => this.redirectTo(result));
    }
    post(url, data) {
        return this.provider
            .res(url, data, 'post')
            .then(response =>
                this.test(response)
                    .then(result => result)
                    .catch(result => this.redirectTo(result))
            )
            .catch(result => this.redirectTo(result));
    }
    put(url, data) {
        return this.provider
            .res(url, data, 'put')
            .then(response =>
                this.test(response)
                    .then(result => result)
                    .catch(result => this.redirectTo(result))
            )
            .catch(result => this.redirectTo(result));
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
    updateToken(token) {
        this.provider.updateToken(token);
    }
}

class ProviderClass {
    constructor() {}
    static createProvider(config = {}) {
        testInputData(config);
        ProviderClass._provider = new Api(
            config.baseUrl || process.env.BASE_URL,
            config.module,
            config.token || null
        );
    }
}

ProviderClass._provider = new Proxy(
    {},
    {
        get(target, p, receiver) {
            throw 'Провайдер не проинициализирован';
        },
    }
);

function testInputData(params) {
    if (typeof params === 'undefined') {
        throw 'Не переданы входные параметры для создания экземпляра';
    } else if (toString.call(params).slice(8, -1) !== 'Object') {
        throw 'Параметры конструкторы должны быть объектом вида { baseUrl: "http://baseUrl", token: "cmAD3cae3Fafvcae.vfaeFcEEECA3.FEAfaAdawd" }';
    }
    if (!params.token) {
        throw 'Не удается получить токен из входных параметров';
    }
    if (!params.baseUrl) {
        throw 'Не удается получить baseUrl из входных параметров';
    }
}

export { Api, ProviderClass, testInputData };
export default { Api, ProviderClass, testInputData };
