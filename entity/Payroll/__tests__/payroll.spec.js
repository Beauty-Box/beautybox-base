import FixturesSuccess from '../__fixtures__/payrollRulesSuccess.json';
import FixturesError from '../__fixtures__/payrollRulesError.json';
import Api from '../../../api';
import { addGetSuccess } from '../../../api/mockHelper';

import { PayrollRules } from '../index';

describe('PayrollRules success', () => {
    beforeEach(() => {
        addGetSuccess(Api, FixturesSuccess);
    });

    it('Должен создать экземпляр', () => {
        expect(() => new PayrollRules({ baseUrl: 'test', token: '123' })).not.toThrowError(
            'Не удается получить токен из входных параметров'
        );
    });

    it('Должен выдать ошибку что токен не передан', () => {
        expect(() => new PayrollRules({ baseUrl: 'test' })).toThrowError(
            'Не удается получить токен из входных параметров'
        );
    });

    it('Должен выдать ошибку что не передан baseUrl', () => {
        expect(() => new PayrollRules({ token: '123' })).toThrowError(
            'Не удается получить baseUrl из входных параметров'
        );
    });

    it('Должен выдать ошибку что не переданы параметры для создания экземпляра', () => {
        expect(() => new PayrollRules()).toThrowError(
            'Не переданы входные параметры для создания экземпляра'
        );
    });

    it('Должен создать экземпляр', async () => {
        expect.assertions(2);
        const payrollRules = new PayrollRules({ baseUrl: 'test', token: '123' });
        await payrollRules.getRules();
        expect(payrollRules.total).toEqual(1);
        expect(payrollRules.payrollRules).toHaveLength(1);
    });
});

describe('PayrollRules', () => {
    beforeEach(() => {
        addGetSuccess(Api, FixturesError);
    });

    const payrollRules = new PayrollRules({ baseUrl: 'test', token: '123' });

    it('Должен создать экземпляр', async () => {
        expect.assertions(1);
        try {
            await payrollRules.getRules();
        } catch (e) {
            expect(e).toEqual('Произошла ошибка при получении списка рассчета зарплат');
        }
    });
});
