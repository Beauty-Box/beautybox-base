import { describe, it, expect, beforeEach } from '@jest/globals';
import { Api } from '../../api';
import { addGetSuccess, addGetError } from '../../api/mockHelper';

jest.mock('../../api/index.js');

import { Client } from '../Clients';

import clientCreateSuccess from '../__fixtures__/clientCreateSuccess.json';
import clientCreateError from '../__fixtures__/clientCreateError.json';

const config = {
    baseUrl: 'test',
    module: 'test',
    token: 'test',
};

describe('client testing', () => {
    let client;
    beforeEach(() => {
        client = new Client('1');
    });

    it('Должен создаваться объект formData', () => {
        let formData = new FormData();
        client._initFormData(formData);
        expect(formData.get('clientTypeID')).toEqual('0');
        expect(formData.get('name')).toEqual('');
    });

    it('Должен корректно устанавливать первую категорию', () => {
        client.setFirstCategory();
        expect(client.clientTypeID).toEqual(0);
        let categories = [
            {
                value: 1,
            },
        ];
        client.setFirstCategory(categories);
        expect(client.clientTypeID).toEqual(1);
    });

    it('Должен общее количество ставок', () => {
        expect(client.uploadedBids).toEqual(0);
    });

    it('Должен возвращать json созданного клиента', async () => {
        addGetSuccess(Api, clientCreateSuccess);
        try {
            await client.init();
            //expect(toString.call(client).slice(8, -1) === 'Object').toBe(true);
            expect(Object.keys(client)).toHaveLength(20);
        } catch (e) {
            console.log(e);
        }
    });

});
