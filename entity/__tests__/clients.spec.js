import { Api } from '../../api';
import { addGetSuccess, addGetError, addPostSuccess, addDelete } from '../../api/mockHelper';

vi.mock('../../api/index.js');

import { Clients } from '../Clients';

import clientsFilteredGetSuccess from '../__fixtures__/clientsFilteredGetSuccess.json';
import clientsIdsFilteredGetSuccess from '../__fixtures__/clientsIdsFilteredGetSuccess.json';
import clientsIdsFilteredGetError from '../__fixtures__/clientsIdsFilteredGetError.json';

describe('clients testing', () => {
    let clientsInstance;
    beforeEach(() => {
        clientsInstance = new Clients();
    });

    it('должна возвращатся строка параметров', () => {
        const args = [
            {
                nameFilter: '',
                clientsTypeFilter: 0,
            },
            0,
            15,
        ];
        const resultString = 'limit=15';
        expect(clientsInstance._getQuery(args)).toEqual(resultString);
        const args2 = [
            {
                nameFilter: 'test',
                clientsTypeFilter: 1,
            },
            15,
            15,
        ];
        clientsInstance.sortBy = 'test';
        const resultString2 =
            'skip=15&limit=15&nameFilter=test&clientsTypeFilter=1&sortBy=test&sortOrder=asc';
        expect(clientsInstance._getQuery(args2)).toEqual(resultString2);
        clientsInstance.sortOrder = true;
        const resultString3 =
            'skip=15&limit=15&nameFilter=test&clientsTypeFilter=1&sortBy=test&sortOrder=desc';
        expect(clientsInstance._getQuery(args2)).toEqual(resultString3);
    });

    it('должен возвращатся список клиентов', async () => {
        addGetSuccess(Api, clientsFilteredGetSuccess);
        const args = [
            {
                nameFilter: '',
                clientsTypeFilter: 0,
            },
            0,
            15,
        ];
        const { clients, count } = await clientsInstance._getClients(args);
        expect(clients).toHaveLength(15);
        expect(count).toEqual(3491);
    });

    it('геттеры должны возвращать список текущих клиентов и их количество', () => {
        expect(clientsInstance.clientsList).toEqual([]);
        expect(clientsInstance.clientsCount).toEqual(0);
    });

    it('должны успешно возвращаться клиент ИД', async () => {
        addGetSuccess(Api, clientsIdsFilteredGetSuccess);
        const args = {
            nameFilter: '+7 (937)',
        };

        await clientsInstance.getClientsIDs(args);
        expect(clientsInstance.clientsIDs.length).toBeGreaterThan(0);
    });

    it('должна возвращаться ошибка валидации при запросе на клиент ИД', async () => {
        addGetSuccess(Api, clientsIdsFilteredGetError);
        const args = {
            nameFilter: '+7 (937)',
        };

        await expect(() => clientsInstance.getClientsIDs(args)).rejects.toThrowError();
    });

    it('должна возвращаться ошибка на уровне Api при запросе на клиент ИД', async () => {
        addGetError(Api, clientsIdsFilteredGetError);
        const args = {
            nameFilter: '+7 (937)',
        };

        await expect(() => clientsInstance.getClientsIDs(args)).rejects.toThrowError();
        expect(clientsInstance.clientsIDs.length).toEqual(0);
    });
});
