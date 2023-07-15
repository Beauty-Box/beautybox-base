import Analytics from '../index';
import analyticEmptyParamsSuccess from '../__fixtures__/analyticsEmptyParamsSuccess.json';
import statisticsEmptyParamsSuccess from '../__fixtures__/statisticsEmptyParamsSuccess.json';
import occupancyEmptyParamsSuccess from '../__fixtures__/occupancyEmptyParamsSuccess.json';
import recoverabilityEmptyParamsSuccess from '../__fixtures__/recoverabilityEmptyParamsSuccess.json';
import client_statisticsEmptyParamsSuccess from '../__fixtures__/client_statisticsEmptyParamsSuccess.json';

import { Api } from '../../../api';
vi.mock('../../../api/index.js');
import { addGetSuccess } from '../../../api/mockHelper';

const config = {
    baseUrl: 'test',
    module: 'test',
    token: 'test',
};

// // функции хелперы для сравнения только ключей объектов
// function structureIsEqual(obj1, obj2) {
//     let tree1 = getKeys(obj1).sort();
//     let tree2 = getKeys(obj2).sort();
//
//     if (tree1.length !== tree2.length) {
//         return false;
//     }
//
//     let mismatch = tree1.find((x, idx) => tree2[idx] !== x);
//     return !mismatch;
// }
//
// function getKeys(obj) {
//     return recursiveKeys(obj, [], []);
// }
//
// function recursiveKeys(obj, result, todo, root = '') {
//     Object.keys(obj).forEach(key => {
//         if (typeof obj[key] === 'object') {
//             result.push(root + key);
//             todo.push({obj: obj[key], root: root + key + '.'});
//         } else {
//             result.push(root + key);
//         }
//     });
//
//     if (todo.length > 0) {
//         let todoItem = todo.pop();
//         return recursiveKeys(todoItem.obj, result, todo, todoItem.root);
//     } else {
//         return result;
//     }
// }

describe('analytics test', () => {
    let analytics;
    beforeAll(() => {
        analytics = new Analytics();
    });

    it('Должен вернуть json анализа при пустой строке параметров', async () => {
        expect.assertions(12);

        addGetSuccess(Api, analyticEmptyParamsSuccess);
        try {
            let numberOfKeysInObject = 6;
            const data = await analytics.analyze();
            for (let i = 0; i < data.length; i++) {
                expect(toString.call(data[i]).slice(8, -1) === 'Object').toBeTruthy();
                if (i === data.length - 1) {
                    numberOfKeysInObject--;
                }
                expect(Object.keys(data[i])).toHaveLength(numberOfKeysInObject);
            }
        } catch (e) {
            console.log(e);
        }
    });

    it('Должен возвращать json статистики при пустой строке параметров', async () => {
        addGetSuccess(Api, statisticsEmptyParamsSuccess);
        expect.assertions(2);
        try {
            const data = await analytics.statistics();
            expect(toString.call(data).slice(8, -1) === 'Object').toBeTruthy();
            expect(data['employees']).toHaveLength(10);
        } catch (e) {
            console.log(e);
        }
    });

    it('Должен возвращать json occupancy при пустой строке параметров', async () => {
        addGetSuccess(Api, occupancyEmptyParamsSuccess);
        expect.assertions(2);
        try {
            const data = await analytics.occupancy();
            expect(toString.call(data).slice(8, -1) === 'Object').toBeTruthy();
            expect(data['employees']).toHaveLength(10);
        } catch (e) {
            console.log(e);
        }
    });

    it('Должен возвращать json recoverability при пустой строке параметров', async () => {
        addGetSuccess(Api, recoverabilityEmptyParamsSuccess);
        expect.assertions(2);
        try {
            const data = await analytics.recoverability();
            expect(toString.call(data).slice(8, -1) === 'Object').toBeTruthy();
            expect(data['employees']).toHaveLength(10);
        } catch (e) {
            console.log(e);
        }
    });

    it('Должен возвращать json client_statistics при пустой строке параметров', async () => {
        addGetSuccess(Api, client_statisticsEmptyParamsSuccess);
        expect.assertions(2);
        try {
            const data = await analytics.clientsStatistics();
            expect(toString.call(data).slice(8, -1) === 'Object').toBeTruthy();
            expect(data['clients']).toHaveLength(15);
        } catch (e) {
            console.log(e);
        }
    });
});
