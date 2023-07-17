import FixturesSuccess from '../__fixtures__/payrollRulesSuccess.json';
import FixturesError from '../__fixtures__/payrollRulesError.json';
import FixturesBrokenData from '../__fixtures__/payrollBrokenData.json';
import { Api } from '../../../api';
vi.mock('../../../api/index.js');
import { addGetSuccess, addPostSuccess, addPut, addDelete } from '../../../api/mockHelper';

import { PayrollRules, PayrollRule } from '../index';

const config = {
    baseUrl: 'test',
    module: 'test',
    token: 'test',
};

describe('create PayrollRule', () => {
    it('Должен создать экземпляр класса', () => {
        const payrollRule = new PayrollRule();
        expect(toString.call(payrollRule).slice(8, -1) !== 'PayrollRule').toEqual(true);
    });
});

describe('PayrollRule addCategory', () => {
    it('Должен добавить новую категорию', () => {
        const payrollRule = new PayrollRule();
        payrollRule.addCategory();
        expect(payrollRule.categories).toHaveLength(1);
    });
});

describe('PayrollRule removeCategory', () => {
    it('Должен создать экземпляр класса', () => {
        const payrollRule = new PayrollRule();
        expect.assertions(1);
        try {
            payrollRule.removeCategory(0);
        } catch (e) {
            expect(e).toEqual('Индекс больше допустимого значения');
        }
    });
    it('Должен создать экземпляр класса', () => {
        const payrollRule = new PayrollRule();
        expect.assertions(1);
        try {
            payrollRule.removeCategory(-1);
        } catch (e) {
            expect(e).toEqual('Индекс не может быть отрицательным');
        }
    });
    it('Должен создать экземпляр класса', () => {
        const payrollRule = new PayrollRule();
        payrollRule.addCategory();
        payrollRule.addCategory();
        payrollRule.removeCategory(1);
        expect(payrollRule.categories).toHaveLength(1);
    });
});

describe('PayrollRule store', () => {
    it('store', async () => {
        expect.assertions(2);
        const payrollRule = new PayrollRule();
        addPostSuccess(Api, {});
        PayrollRule.createProvider(config);
        try {
            const { errors } = await PayrollRule.store(payrollRule);
            expect(toString.call(errors).slice(8, -1) === 'Object').toBe(true);
            expect(Object.keys(errors)).toHaveLength(0);
        } catch (e) {
            console.log(e);
        }
    });
    it('store', async () => {
        expect.assertions(2);
        const payrollRule = new PayrollRule();
        payrollRule.addCategory();
        payrollRule.addCategory(false);
        addPostSuccess(Api, {});
        PayrollRule.createProvider(config);
        try {
            const { errors } = await PayrollRule.store(payrollRule);
            expect(toString.call(errors).slice(8, -1) === 'Object').toBe(true);
            expect(Object.keys(errors)).toHaveLength(0);
        } catch (e) {
            console.log(e);
        }
    });
});
describe('PayrollRule update', () => {
    it('update', async () => {
        expect.assertions(2);
        const payrollRule = new PayrollRule();
        addPut(Api, {});
        PayrollRule.createProvider(config);
        try {
            const { errors } = await PayrollRule.update(1, payrollRule);
            expect(toString.call(errors).slice(8, -1) === 'Object').toBe(true);
            expect(Object.keys(errors)).toHaveLength(0);
        } catch (e) {
            console.log(e);
        }
    });
    it('update', async () => {
        expect.assertions(2);
        const payrollRule = new PayrollRule();
        payrollRule.addCategory();
        payrollRule.addCategory(false);
        addPut(Api, {});
        PayrollRule.createProvider(config);
        try {
            const { errors } = await PayrollRule.update(1, payrollRule);
            expect(toString.call(errors).slice(8, -1) === 'Object').toBe(true);
            expect(Object.keys(errors)).toHaveLength(0);
        } catch (e) {
            console.log(e);
        }
    });
});

describe('PayrollRule show', () => {
    it('show', async () => {
        expect.assertions(2);
        addGetSuccess(Api, {});
        PayrollRule.createProvider(config);
        try {
            const { errors } = await PayrollRule.show(1);
            expect(toString.call(errors).slice(8, -1) === 'Object').toBe(true);
            expect(Object.keys(errors)).toHaveLength(0);
        } catch (e) {
            console.log(e);
        }
    });
});

describe('PayrollRule delete', () => {
    it('show', async () => {
        expect.assertions(2);
        addDelete(Api, {});
        PayrollRule.createProvider(config);
        try {
            const { errors } = await PayrollRule.delete(1);
            expect(toString.call(errors).slice(8, -1) === 'Object').toBe(true);
            expect(Object.keys(errors)).toHaveLength(0);
        } catch (e) {
            console.log(e);
        }
    });
});

describe('create PayrollRules', () => {
    it('Должен создать экземпляр класса', () => {
        const payrollRules = new PayrollRules();
        expect(toString.call(payrollRules).slice(8, -1) !== 'PayrollRules').toEqual(true);
    });
});

describe('PayrollRules getRules', () => {
    it('Должен получить корректные данные', async () => {
        PayrollRules.createProvider(config);
        addGetSuccess(Api, FixturesSuccess);
        expect.assertions(2);
        const res = await PayrollRules.getRules();
        expect(res.total).toEqual(2);
        expect(res.payrollRules).toHaveLength(1);
    });

    it('Должен выдать исключение, что сервер вернул ошибку', async () => {
        PayrollRules.createProvider(config);
        addGetSuccess(Api, FixturesError.errorMessages);
        const res = await PayrollRules.getRules();
        expect(res.errors.messages).toEqual('Error');
    });

    it('Должен выдать исключение, что сервер вернул не массив', async () => {
        expect.assertions(1);
        PayrollRules.createProvider(config);
        addGetSuccess(Api, FixturesBrokenData.payrollRulesNotArray);
        try {
            await PayrollRules.getRules();
        } catch (e) {
            expect(e).toEqual('Значение не является массивом');
        }
    });
});

describe('PayrollRules addRules', () => {
    it('Должен выдать исключение, что сервер вернул не массив', async () => {
        expect.assertions(1);
        PayrollRules.createProvider(config);
        addGetSuccess(Api, FixturesBrokenData.payrollRulesNotArray);
        try {
            await PayrollRules.addRules();
        } catch (e) {
            expect(e).toEqual('Значение не является массивом');
        }
    });

    it('Должен выдать исключение, что сервер вернул неверные данные', async () => {
        expect.assertions(1);
        PayrollRules.createProvider(config);
        addGetSuccess(Api, FixturesBrokenData.totalString);
        try {
            await PayrollRules.addRules();
        } catch (e) {
            expect(e).toEqual('Значение не является целым числом');
        }
    });

    it('Должен выдать исключение, что сервер вернул неверные данные', async () => {
        expect.assertions(1);
        PayrollRules.createProvider(config);
        addGetSuccess(Api, FixturesSuccess);
        try {
            const instance = new PayrollRules();
            ({ payrollRules: instance.items } = await PayrollRules.addRules());
            expect(instance.items).toHaveLength(1);
        } catch (e) {
            expect(e).toEqual('Значение не является целым числом');
        }
    });
    it('Должен выдать исключение, что сервер вернул неверные данные', async () => {
        expect.assertions(1);
        try {
            const instance = new PayrollRules();
            instance.items = 1;
        } catch (e) {
            expect(e).toEqual('Устанавливаемое значение не явъяется массивом');
        }
    });
    it('Должен выдать исключение, что сервер вернул неверные данные', async () => {
        expect.assertions(1);
        try {
            const instance = new PayrollRules();
            instance.errors = { messages: 'test' };
        } catch (e) {
            expect(e).toEqual('test');
        }
    });
    it('Должен выдать исключение, что сервер вернул неверные данные', async () => {
        expect.assertions(1);
        try {
            const instance = new PayrollRules();
            instance.errors = { test: 'test' };
        } catch (e) {
            expect(e).toEqual('Произошла ошибка при получении списка рассчета зарплат');
        }
    });

    it('Должен выдать исключение, что сервер вернул неверные данные', async () => {
        expect.assertions(4);
        PayrollRules.createProvider(config);
        addGetSuccess(Api, FixturesSuccess);
        try {
            const { errors, total, payrollRules } = await PayrollRules.addRules();
            expect(toString.call(errors).slice(8, -1) === 'Object').toBe(true);
            expect(Object.keys(errors)).toHaveLength(0);
            expect(Number.isInteger(total)).toBe(true);
            expect(Array.isArray(payrollRules)).toBe(true);
        } catch (e) {
            expect(e).toEqual('Значение не является целым числом');
        }
    });
});
