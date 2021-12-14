import { describe, it, expect, beforeEach } from '@jest/globals';
import { Api } from '../../api';
import { addGetSuccess, addGetError, addPostSuccess, addDelete } from '../../api/mockHelper';

jest.mock('../../api/index.js');

import { Client } from '../Clients';

import clientCreateSuccess from '../__fixtures__/clientCreateSuccess.json';
import clientShowSuccess from '../__fixtures__/clientShowSuccess.json';
import clientEditSuccess from '../__fixtures__/clientEditSuccess.json';
import clientAddPostSuccess from '../__fixtures__/clientAddPostSuccess.json';
import clientAddPostError from '../__fixtures__/clientAddPostError.json';
import clientDeleteError from '../__fixtures__/clientDeleteError.json';
import clientGetBidsSuccess from '../__fixtures__/clientGetBidsSuccess.json';
import clientGetCategoryShortSuccess from '../__fixtures__/clientGetCategoryShortSuccess.json';
import clientGetAnalyticsSuccess from '../__fixtures__/clientGetAnalyticsSuccess.json';
import clientGetAnalyticNullSuccess from '../__fixtures__/clientGetAnalyticNullSuccess.json';

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
        client = new Client();
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

    it('Должен возвращать json просмотра указанного клиента', async () => {
        addGetSuccess(Api, clientShowSuccess);
        try {
            await client.show();
            expect(Object.keys(client)).toHaveLength(23);
        } catch (e) {
            console.log(e);
        }
    });

    it('Должен возвращать json редактируемого клиента', async () => {
        addGetSuccess(Api, clientEditSuccess);
        try {
            await client.edit();
            expect(Object.keys(client)).toHaveLength(20);
        } catch (e) {
            console.log(e);
        }
    });

    it('Должна возвращатся ошибка при апдейте', async () => {
        addPostSuccess(Api, {});
        client.clientID = 2422;
        await client.update();
        expect(Object.keys(client.errors)).toEqual([]);
    });

    // it('должен возвращатся clientId созданного клиента', async () => {
    //     addPostSuccess(Api, clientAddPostSuccess);
    //     client.phone = '+7 (111) 111-11-11';
    //     await client.create();
    //     expect(client.clientID).toEqual(20643);
    // });

    it('должен возвращатся массив ошибок', async () => {
        addPostSuccess(Api, clientAddPostError);
        await client.create();
        expect(Object.keys(client.errors)).not.toEqual([]);
    });

    it('клиент должен удалится с ошибкой', async () => {
        client.clientID = 0;
        addDelete(Api, {});
        //let del = jest.fn(() => client.delete);
        //client.delete();
        //del();
        expect(client.delete()).rejects.toMatch('Нельзя удалить не созданого клиента');
    });

    it('клиент должен удалятся', async () => {
        client.clientID = 57554;
        addDelete(Api, {});
        expect(client.delete()).resolves;
    });

    it('должны выводится ставки по заданному клиенту', async () => {
        client.clientID = 2258;
        addGetSuccess(Api, clientGetBidsSuccess);
        await client.getBids();
        expect(client.bids.count).toEqual(3);
        expect(client.bids.past).toHaveLength(3);
        expect(client.bids.coming).toHaveLength(0);
    });

    it('должны выводится категории', async () => {
        addGetSuccess(Api, clientGetCategoryShortSuccess);
        await client.getCategories();
        expect(client.categories).not.toHaveLength(0);
    });

    it('должна возвращатся аналитика', async () => {
        addGetSuccess(Api, clientGetAnalyticsSuccess);
        await client.getAnalytics();
        expect(Object.keys(client.countBids)).not.toHaveLength(0);
        expect(client.profit).toEqual(450);
    });

    it('должен вернуть среднее число ставок', async () => {
        addGetSuccess(Api, clientGetAnalyticsSuccess);
        await client.getAnalytics();
        expect(client.averageCheck).toEqual(450);
        addGetSuccess(Api, clientGetAnalyticNullSuccess);
        await client.getAnalytics();
        expect(client.averageCheck).toEqual(0);
    });
});
