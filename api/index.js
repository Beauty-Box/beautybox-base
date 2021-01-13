import { TestStatus } from './TestStatus';
import { FetchApi as Provider } from './FetchApi';

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
}

class Api extends TestStatus {
    constructor(baseUrl, module, token) {
        super();
        window.refresh = null;
        this.baseUrl = baseUrl;
        this.module = module;
        this._setProvider(baseUrl, module, token);

        return new Proxy(this, {
            get(target, p, receiver) {
                if (['get', 'post', 'put', 'delete', 'patch'].includes(p)) {
                    return (url, data, module = '') => target._response(url, data, p, module);
                } else {
                    return target[p];
                }
            },
        });
    }
    _setProvider(baseUrl, module, token) {
        this.provider = new Provider(baseUrl, module, token);
    }
    async _response(url, data, method, module = '') {
        if (this.provider.token) {
            const payload = parseJwt(this.provider.token);
            const now = new Date();
            const exp = new Date(parseInt(payload.exp) * 1000);
            if (now >= exp) {
                if (!window.refresh) {
                    try {
                        window.refresh = this.refreshToken();
                        await window.refresh;
                        return await this.test(await this.provider.res(url, data, method, module));
                    } catch (e) {
                        return this.redirectTo(e);
                    }
                } else {
                    try {
                        await window.refresh;
                        return await this.test(await this.provider.res(url, data, method, module));
                    } catch (e) {
                        return this.redirectTo(e);
                    }
                }
            }
        }
        try {
            return await this.test(await this.provider.res(url, data, method, module));
        } catch (e) {
            return this.redirectTo(e);
        }
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
    refreshToken() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.provider.res('/refresh-token', {}, 'post', 'auth');
                const { access_token: token } = await this.test(res);
                window.refresh = null;
                this.updateToken(token);
                if (localStorage) {
                    localStorage.setItem('access_token', token);
                }
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }
    async errorHandler(result, url, data, method, module) {
        if (result.status === 401 && !this.refresh && result.errors.code === 100) {
            this.refresh = this.refreshToken();
            return;
        }
        this.redirectTo(result);
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
