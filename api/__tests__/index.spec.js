import { Api, ProviderClass } from '../index';

function genValidToken() {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    const timeStamp = parseInt((date.getTime() / 1000).toFixed(0));
    return genToken(timeStamp);
}

jest.mock('node-fetch');

import fetch from 'node-fetch';
const mockResponse = jest.fn();
Object.defineProperty(window, 'location', {
    value: {
        hash: {
            endsWith: mockResponse,
            includes: mockResponse,
        },
        assign: mockResponse,
        replace(url) {
            return url;
        },
    },
    writable: true,
});

const methods = ['get', 'post', 'put', 'delete', 'patch'];
const errorStatus = [400, 401, 403, 404, 422, 500];
class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }
}

global.localStorage = new LocalStorageMock();

function genToken(time) {
    const partOne = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.';
    const partTree = '.inec43Fv32yyRV7Ly48Onp385xV52_gfcntQGvPLJXs';
    const payload = {
        name: 'John Doe',
        iat: 1516239022,
        exp: time,
    };
    const jsonPayload = btoa(JSON.stringify(payload))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/\=+$/, '');
    return partOne + jsonPayload + partTree;
}

function genInvalidToken() {
    const date = new Date();
    date.setHours(date.getHours() - 1);
    const timeStamp = parseInt((date.getTime() / 1000).toFixed(0));
    return genToken(timeStamp);
}

const config = {
    BASE_URL: 'http://qwe.zxc',
    token: '',
    module: 'test',
};
let api;

beforeEach(() => {
    fetch.mockImplementation(() =>
        Promise.resolve({
            status: 200,
            headers: {
                get() {
                    return 'application/json';
                },
            },
            ok: true,
            json: () =>
                Promise.resolve({
                    token:
                        'lknaefqbjkebckwuebwvbuqbuequobfbueb.adcjaaecnqkuencqe.qaeveqecqefafa3rfq3fqe',
                    rates: { CAD: 1.42 },
                }),
        })
    );
});
// module Api
describe('Api', () => {
    beforeEach(() => {
        api = new Api(config);
        const token = genValidToken();
        localStorage.setItem('access_token', token);
        api.updateToken(token);
    });
    errorStatus.forEach(item => {
        it(`Должен правильно обработать ${item}`, async () => {
            const spy = jest.spyOn(api, 'redirectTo');
            fetch.mockImplementation(() =>
                Promise.resolve({
                    status: item,
                    headers: {
                        get() {
                            return 'application/json';
                        },
                    },
                    ok: false,
                    json: () =>
                        Promise.resolve({
                            errors: {
                                rates: { CAD: 1.42 },
                            },
                        }),
                })
            );
            await api.get('test-request');
            expect(spy).toBeCalledTimes(1);
        });
    });
    methods.forEach(item => {
        it(`Должен вызвать метод ${item}`, async () => {
            const spy = jest.spyOn(api, 'refreshToken');
            await Promise.all([api[item]('test-request'), api[item]('test-request')]);
            expect(spy).toBeCalledTimes(0);
        });
    });
});

describe('Api', () => {
    beforeEach(() => {
        api = new Api(config);
        const token = genValidToken();
        localStorage.setItem('access_token', token);
    });
    methods.forEach(item => {
        it(`Должен вызвать метод ${item}`, async () => {
            const token = genInvalidToken();
            api.updateToken(token);
            const spy = jest.spyOn(api, 'refreshToken');
            await Promise.all([api[item]('test-request'), api[item]('test-request')]);
            expect(spy).toBeCalledTimes(0);
        });
    });
});

describe('Api', () => {
    beforeEach(() => {
        api = new Api(config);
        const token = genInvalidToken();
        localStorage.setItem('access_token', token);
        api.updateToken(token);
    });
    methods.forEach(item => {
        it(`Должен вызвать метод ${item}`, async () => {
            const spy = jest.spyOn(api, 'refreshToken');
            await Promise.all([api[item]('test-request'), api[item]('test-request')]);
            expect(spy).toBeCalledTimes(1);
        });
    });
});

describe('Api', () => {
    beforeEach(() => {
        api = new Api(config);
    });
    methods.forEach(item => {
        it(`Должен вызвать метод ${item}`, async () => {
            const spy = jest.spyOn(api, 'refreshToken');
            await Promise.all([api[item]('test-request'), api[item]('test-request')]);
            expect(spy).toBeCalledTimes(0);
        });
    });
});

// module
describe('ProviderClass', () => {
    beforeEach(() => {
        ProviderClass._provider = new Proxy(
            {},
            {
                get(target, p, receiver) {
                    throw 'Провайдер не проинициализирован';
                },
            }
        );
    });
    it('Должен вернуть ошибку при неициализированом провайдоре', () => {
        expect.assertions(1);
        try {
            ProviderClass._provider.get('test');
        } catch (e) {
            expect(e).toEqual('Провайдер не проинициализирован');
        }
    });

    it('Должен успешно создать провайдер', () => {
        expect.assertions(1);
        try {
            ProviderClass.createProvider(config);
        } catch (e) {
            expect(e).toEqual('Не удается получить baseUrl из входных параметров');
        }
    });
    it('Должен выдать ошибку если не передать данные в createProvider', () => {
        expect.assertions(1);
        try {
            ProviderClass.createProvider();
        } catch (e) {
            expect(e).toEqual('Не переданы входные параметры для создания экземпляра');
        }
    });
    it('Должен выдать ошибку если параметры не являются объектом', () => {
        expect.assertions(1);
        try {
            ProviderClass.createProvider([]);
        } catch (e) {
            expect(e).toEqual(
                'Параметры конструкторы должны быть объектом вида { baseUrl: "http://baseUrl" }'
            );
        }
    });
});
