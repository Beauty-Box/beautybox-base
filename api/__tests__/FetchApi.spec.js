import { FetchApi } from '../FetchApi';

jest.mock('node-fetch', () => () =>
    Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
    })
);

import fetch from 'node-fetch';

const config = {
    BASE_URL: 'http://qwe.zxc',
    module: 'test',
};

describe('', () => {
    it('', async () => {
        expect.assertions(1);
        const $fetch = new FetchApi(config.BASE_URL, config.module, '123');
        try {
            const res = await $fetch.res('asd', {}, 'get', 'test');

            const result = await res.json();
            expect(result.rates.CAD).toEqual(1.42);
        } catch (e) {
            console.log(e, 'e');
        }
    });
    it('', async () => {
        expect.assertions(1);
        const $fetch = new FetchApi(config.BASE_URL, config.module);
        try {
            const res = await $fetch.res('asd', {}, 'get', 'test');
            const result = await res.json();
            expect(result.rates.CAD).toEqual(1.42);
        } catch (e) {
            console.log(e, 'e');
        }
    });

    it('', async () => {
        const $fetch = new FetchApi(config);
        $fetch.updateToken('123');
        expect($fetch.token).toEqual('123');
    });
});
