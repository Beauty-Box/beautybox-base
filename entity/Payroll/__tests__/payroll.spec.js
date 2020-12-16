import FixturesSuccess from '../__fixtures__/payrollRulesSuccess.json';
import FixturesError from '../__fixtures__/payrollRulesError.json';
import FixturesBrokenData from '../__fixtures__/payrollBrokenData.json';
import Api from '../../../api';
jest.mock('../../../api/index.js');
import { addGetSuccess } from '../../../api/mockHelper';

import { PayrollRules, Payroll } from '../index';

describe('PayrollRules getRules', () => {
    it('Должен получить корректные данные', async () => {
        PayrollRules.createProvider();
        addGetSuccess(Api, FixturesSuccess);
        expect.assertions(2);
        const res = await PayrollRules.getRules();
        expect(res.total).toEqual(2);
        expect(res.payrollRules).toHaveLength(1);
    });

    it('Должен выдать исключение, что сервер вернул ошибку', async () => {
        PayrollRules.createProvider();
        addGetSuccess(Api, FixturesError.errorMessages);
        const res = await PayrollRules.getRules();
        expect(res.errors.messages).toEqual('Error');
    });

    it('Должен выдать исключение, что сервер вернул неверные данные', async () => {
        PayrollRules.createProvider();
        addGetSuccess(Api, FixturesBrokenData.payrollRulesNotArray);
        const res = await PayrollRules.getRules();
        expect(res.payrollRules).toEqual('123');
    });
});

describe('PayrollRules addRules', () => {
    it('Должен выдать исключение, что сервер вернул неверные данные', async () => {
        PayrollRules.createProvider();
        addGetSuccess(Api, FixturesBrokenData.payrollRulesNotArray);
        const res = await PayrollRules.addRules();
        expect(res.payrollRules).toEqual('123');
    });

    it('Должен выдать исключение, что сервер вернул неверные данные', async () => {
        PayrollRules.createProvider();
        addGetSuccess(Api, FixturesBrokenData.totalString);
        const res = await PayrollRules.addRules();
        expect(res.total).toEqual('1');
    });
});
