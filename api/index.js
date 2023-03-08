import { TestStatus } from './TestStatus';
import { FetchApi as Provider } from './FetchApi';
import { BUNDLER_AGNOSTIC_ENV } from '../helpers';

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
    constructor(baseUrl, module, token, secure = true) {
        super();
        window.refresh = null;
        this.baseUrl = baseUrl;
        this.module = module;
        this.secure = secure;
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
        const request = async () => {
            return await this.statusHandler(await this.provider.res(url, data, method, module));
        };
        if (this.provider.token) {
            const localToken = localStorage.getItem('access_token');
            if (localToken !== this.provider.token) {
                this.updateToken(localToken);
            }
            if (!this.secure) {
                return await request();
            }
            if (!window.refresh) {
                const payload = parseJwt(this.provider.token);
                const now = new Date().getTime();
                const exp = parseInt(payload.exp) * 1000;
                if (now >= exp) {
                    try {
                        window.refresh = this.refreshToken();
                        const token = await window.refresh;
                        this.updateToken(token);
                        return await request();
                    } catch (e) {
                        return this.redirectTo(e);
                    }
                }
            } else {
                try {
                    const token = await window.refresh;
                    this.updateToken(token);
                    return await request();
                } catch (e) {
                    return this.redirectTo(e);
                }
            }
        }
        try {
            return await request();
        } catch (e) {
            return this.redirectTo(e);
        }
    }
    redirectTo(result) {
        console.log('--- redirect', result);

        if (result.status >= 500) {
            document.dispatchEvent(new Event('server-error'));
            return result;
        }
        if (result.status === 400) {
            document.dispatchEvent(new Event('bad-request'));
            return result;
        }
        if (result.status === 401) {
            if (result.code === 100) {
                return;
            }
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
                const { access_token: token } = await this.statusHandler(res);
                this.updateToken(token);
                if (localStorage) {
                    localStorage.setItem('access_token', token);
                }
                window.refresh = null;
                resolve(token);
            } catch (e) {
                console.log('e', JSON.stringify(e));
                window.refresh = null;
                reject(e);
            }
        });
    }
    updateToken(token) {
        this.provider.updateToken(token);
    }
}

class ProviderClass {
    constructor() {}
    static createProvider(config) {
        testInputData(config);
        ProviderClass._provider = new Api(
            config.baseUrl || BUNDLER_AGNOSTIC_ENV.BASE_URL,
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
        throw 'Параметры конструкторы должны быть объектом вида { baseUrl: "http://baseUrl" }';
    }
    if (!params.baseUrl) {
        throw 'Не удается получить baseUrl из входных параметров';
    }
}

export { Api, ProviderClass, testInputData };
export default { Api, ProviderClass, testInputData };
