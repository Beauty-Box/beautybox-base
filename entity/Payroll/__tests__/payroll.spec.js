import FixturesSuccess from '../__fixtures__/payrollRulesSuccess.json';
import FixturesError from '../__fixtures__/payrollRulesError.json';
import FixturesBrokenData from '../__fixtures__/payrollBrokenData.json';
import Api from '../../../api';
jest.mock('../../../api/index.js');
import { addGetSuccess } from '../../../api/mockHelper';

import { PayrollRules, Payroll } from '../index';

describe('Payroll instantiation', () => {
    addGetSuccess(Api, FixturesSuccess);

    it('Должен создать экземпляр', () => {
        expect(() => new Payroll({ baseUrl: 'test', token: '123' })).not.toThrowError(
            'Не удается получить токен из входных параметров'
        );
    });

    it('Должен выдать ошибку что токен не передан', () => {
        expect(() => new Payroll({ baseUrl: 'test' })).toThrowError(
            'Не удается получить токен из входных параметров'
        );
    });

    it('Должен выдать ошибку что не передан baseUrl', () => {
        expect(() => new Payroll({ token: '123' })).toThrowError(
            'Не удается получить baseUrl из входных параметров'
        );
    });

    it('Должен выдать ошибку что не переданы параметры для создания экземпляра', () => {
        expect(() => new Payroll()).toThrowError(
            'Не переданы входные параметры для создания экземпляра'
        );
    });

    it('Должен выдать ошибку при передаче в параметры числа вместо объекта', () => {
        expect(() => new Payroll(123)).toThrowError(
            'Параметры конструкторы должны быть объектом вида { baseUrl: "http://baseUrl", token: "cmAD3cae3Fafvcae.vfaeFcEEECA3.FEAfaAdawd" }'
        );
    });

    it('Должен выдать ошибку при передаче в параметры строки вместо объекта', () => {
        expect(() => new Payroll('123')).toThrowError(
            'Параметры конструкторы должны быть объектом вида { baseUrl: "http://baseUrl", token: "cmAD3cae3Fafvcae.vfaeFcEEECA3.FEAfaAdawd" }'
        );
    });

    it('Должен выдать ошибку при передаче в параметры false вместо объекта', () => {
        expect(() => new Payroll(false)).toThrowError(
            'Параметры конструкторы должны быть объектом вида { baseUrl: "http://baseUrl", token: "cmAD3cae3Fafvcae.vfaeFcEEECA3.FEAfaAdawd" }'
        );
    });

    it('Должен выдать ошибку при передаче в параметры true вместо объекта', () => {
        expect(() => new Payroll(true)).toThrowError(
            'Параметры конструкторы должны быть объектом вида { baseUrl: "http://baseUrl", token: "cmAD3cae3Fafvcae.vfaeFcEEECA3.FEAfaAdawd" }'
        );
    });

    it('Должен выдать ошибку при передаче в параметры массива вместо объекта', () => {
        expect(() => new Payroll([])).toThrowError(
            'Параметры конструкторы должны быть объектом вида { baseUrl: "http://baseUrl", token: "cmAD3cae3Fafvcae.vfaeFcEEECA3.FEAfaAdawd" }'
        );
    });

    it('Должен выдать ошибку при передаче в параметры null вместо объекта', () => {
        expect(() => new Payroll(null)).toThrowError(
            'Параметры конструкторы должны быть объектом вида { baseUrl: "http://baseUrl", token: "cmAD3cae3Fafvcae.vfaeFcEEECA3.FEAfaAdawd" }'
        );
    });
});

describe('PayrollRules instantiation', () => {
    addGetSuccess(Api, FixturesSuccess);

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

    it('Должен выдать ошибку при передаче в параметры числа вместо объекта', () => {
        expect(() => new PayrollRules(123)).toThrowError(
            'Параметры конструкторы должны быть объектом вида { baseUrl: "http://baseUrl", token: "cmAD3cae3Fafvcae.vfaeFcEEECA3.FEAfaAdawd" }'
        );
    });

    it('Должен выдать ошибку при передаче в параметры строки вместо объекта', () => {
        expect(() => new PayrollRules('123')).toThrowError(
            'Параметры конструкторы должны быть объектом вида { baseUrl: "http://baseUrl", token: "cmAD3cae3Fafvcae.vfaeFcEEECA3.FEAfaAdawd" }'
        );
    });

    it('Должен выдать ошибку при передаче в параметры false вместо объекта', () => {
        expect(() => new PayrollRules(false)).toThrowError(
            'Параметры конструкторы должны быть объектом вида { baseUrl: "http://baseUrl", token: "cmAD3cae3Fafvcae.vfaeFcEEECA3.FEAfaAdawd" }'
        );
    });

    it('Должен выдать ошибку при передаче в параметры true вместо объекта', () => {
        expect(() => new PayrollRules(true)).toThrowError(
            'Параметры конструкторы должны быть объектом вида { baseUrl: "http://baseUrl", token: "cmAD3cae3Fafvcae.vfaeFcEEECA3.FEAfaAdawd" }'
        );
    });

    it('Должен выдать ошибку при передаче в параметры массива вместо объекта', () => {
        expect(() => new PayrollRules([])).toThrowError(
            'Параметры конструкторы должны быть объектом вида { baseUrl: "http://baseUrl", token: "cmAD3cae3Fafvcae.vfaeFcEEECA3.FEAfaAdawd" }'
        );
    });

    it('Должен выдать ошибку при передаче в параметры null вместо объекта', () => {
        expect(() => new PayrollRules(null)).toThrowError(
            'Параметры конструкторы должны быть объектом вида { baseUrl: "http://baseUrl", token: "cmAD3cae3Fafvcae.vfaeFcEEECA3.FEAfaAdawd" }'
        );
    });
});

describe('PayrollRules getRules', () => {
    it('Должен получить корректные данные', async () => {
        addGetSuccess(Api, FixturesSuccess);
        expect.assertions(2);
        const payrollRules = new PayrollRules({ baseUrl: 'test', token: '123' });
        await payrollRules.getRules();
        expect(payrollRules.total).toEqual(2);
        expect(payrollRules.payrollRules).toHaveLength(1);
    });

    it('Должен выдать исключение, что сервер вернул ошибку', async () => {
        addGetSuccess(Api, FixturesError.errorMessages);
        expect.assertions(1);
        const payrollRules = new PayrollRules({ baseUrl: 'test', token: '123' });
        try {
            await payrollRules.getRules();
        } catch (e) {
            expect(e).toEqual('Error');
        }
    });

    it('Должен выдать исключение, что сервер вернул неверные данные', async () => {
        addGetSuccess(Api, FixturesBrokenData.payrollRulesNotArray);
        expect.assertions(1);
        const payrollRules = new PayrollRules({ baseUrl: 'test', token: '123' });
        try {
            await payrollRules.getRules();
        } catch (e) {
            expect(e).toEqual('Устанавливаемое значение не явъяется массивом');
        }
    });
});

describe('PayrollRules addRules', () => {
    it('Должен выдать исключение, что сервер вернул неверные данные', async () => {
        addGetSuccess(Api, FixturesSuccess);
        expect.assertions(1);
        const payrollRules = new PayrollRules({ baseUrl: 'test', token: '123' });
        try {
            await payrollRules.getRules();
            addGetSuccess(Api, FixturesBrokenData.payrollRulesNotArray);
            await payrollRules.addRules();
        } catch (e) {
            expect(e).toEqual('Устанавливаемое значение не явъяется массивом');
        }
    });

    it('Должен выдать исключение, что сервер вернул неверные данные', async () => {
        addGetSuccess(Api, FixturesSuccess);
        expect.assertions(1);
        const payrollRules = new PayrollRules({ baseUrl: 'test', token: '123' });
        try {
            await payrollRules.getRules();
            addGetSuccess(Api, FixturesBrokenData.totalString);
            await payrollRules.addRules();
        } catch (e) {
            expect(e).toEqual('total должен быть целым числом');
        }
    });
});

describe('PayrollRules _testOnError', () => {
    it('Должен выкидывать исключение', () => {
        addGetSuccess(Api, FixturesSuccess);
        expect.assertions(1);
        const payrollRules = new PayrollRules({ baseUrl: 'test', token: '123' });
        try {
            payrollRules.errors = { messages: 'Test' };
            payrollRules._testOnError();
        } catch (e) {
            expect(e).toEqual('Test');
        }
    });

    it('Должен выкидывать исключение', () => {
        addGetSuccess(Api, FixturesSuccess);
        expect.assertions(1);
        const payrollRules = new PayrollRules({ baseUrl: 'test', token: '123' });
        try {
            payrollRules.errors = { status: 403 };
            payrollRules._testOnError();
        } catch (e) {
            expect(e).toEqual('Произошла ошибка при получении списка рассчета зарплат');
        }
    });
});
