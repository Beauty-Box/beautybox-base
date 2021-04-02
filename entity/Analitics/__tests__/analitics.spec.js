import Analytics from '../index';
import analyticEmptyParamsSuccess from '../__fixtures__/analyticsEmptyParamsSuccess.json';
import { describe, expect, it } from '@jest/globals';

import { Api } from '../../../api';
jest.mock('../../../api/index.js');
import { addGetSuccess } from '../../../api/mockHelper';

const config = {
    baseUrl: 'test',
    module: 'test',
    token: 'test',
};

// функции хелперы для сравнения только ключей объектов
function structureIsEqual(obj1, obj2) {
    let tree1 = getKeys(obj1).sort();
    let tree2 = getKeys(obj2).sort();

    if (tree1.length !== tree2.length) {
        return false;
    }

    let mismatch = tree1.find((x, idx) => tree2[idx] !== x);
    return !mismatch;
}

function getKeys(obj) {
    return recursiveKeys(obj, [], []);
}

function recursiveKeys(obj, result, todo, root = '') {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') {
            result.push(root + key);
            todo.push({obj: obj[key], root: root + key + '.'});
        } else {
            result.push(root + key);
        }
    });

    if (todo.length > 0) {
        let todoItem = todo.pop();
        return recursiveKeys(todoItem.obj, result, todo, todoItem.root);
    } else {
        return result;
    }
}

describe('analytics test', () => {
    it('Должен вернуть json анализа при пустой строке параметров', () => {
        //expect.assertions(2);
        addGetSuccess(Api, {});
        //Analytics.createProvider(config);
        const analytics = new Analytics();
        const response = analytics.analyze();
        //console.log(response);
        response
            .then(jsonResponse => {
                console.log(jsonResponse);
                //expect(jsonResponse[0]).toEqual(analyticEmptyParamsSuccess[0]);
                //for (let i = 0; 0 < jsonResponse.length; i++) {
                  //  console.log(jsonResponse[i]);
                    // let status = structureIsEqual(jsonResponse[i], analyticEmptyParamsSuccess[i]);
                    // expect(status).toBeTruthy();
                //}
            })
            .catch(error => {
                //console.log(error);
            });
        //const jsonResponse = response.json();
        // for (let i = 0; 0 < jsonResponse.length; i++) {
        //     console.log(jsonResponse[i]);
        //     expect(jsonResponse[i]).toEqual(analyticEmptyParamsSuccess[i]);
        // }
    });
});