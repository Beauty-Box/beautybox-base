import { FetchApi } from '../FetchApi';

vi.mock('node-fetch', async (importOriginal) => {
    const original = await importOriginal();
    return {
        ...original,
        default: vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
            })
        ),
    };
});

// модуль апи берет fetch из window, а window получатеся кода vitest превращает global в window внутри теста
global.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
    })
);

const config = {
    BASE_URL: 'http://qwe.zxc',
    module: 'test',
};

describe('fetch api', () => {
    it('CAD should equal number with token', async () => {
        expect.assertions(1);
        const $fetch = new FetchApi(config.BASE_URL, config.module, '123');
        try {
            const res = await $fetch.res('asd', undefined, 'get', 'test');

            const result = await res.json();
            expect(result.rates.CAD).toEqual(1.42);
        } catch (e) {
            console.log(e, 'e');
        }
    });
    it('CAD should equal number without token', async () => {
        expect.assertions(1);
        const $fetch = new FetchApi(config.BASE_URL, config.module);
        try {
            const res = await $fetch.res('asd', undefined, 'get', 'test');
            const result = await res.json();
            expect(result.rates.CAD).toEqual(1.42);
        } catch (e) {
            console.log(e, 'e');
        }
    });

    it('fetch api token should be updated', async () => {
        const $fetch = new FetchApi(config);
        $fetch.updateToken('123');
        expect($fetch.token).toEqual('123');
    });
});
