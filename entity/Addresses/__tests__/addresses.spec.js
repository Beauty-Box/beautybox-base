import FixtureSuccess from '../__fixtures__/addressSuccess.json';

import Addresses from '../index';
import { addGetSuccess } from '../../../api/mockHelper';
import { Api } from '../../../api';
vi.mock('../../../api/index.js');

const config = {
    baseUrl: 'test',
    module: 'test',
    token: 'test',
};

describe('address testing', () => {
    it('должен вернуть адрес в формате json', async () => {
        expect.assertions(2);
        const addr = new Addresses();
        addGetSuccess(Api, FixtureSuccess);
        try {
            let data = await addr.addresses();
            expect(toString.call(data).slice(8, -1) === 'Object').toBe(true);
            expect(Object.keys(data)).toHaveLength(7);
        } catch (e) {
            console.log(e);
        }
    });
});
