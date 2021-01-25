import { IsoToRu } from '../IsoToRu';

describe('Тест приведения формата даты', () => {
    it('Должен выкинуть ошибку при передаче неверного типа данных', () => {
        expect(() => IsoToRu(123)).toThrowError('Ожидалась дата формата ГГГГ-ММ-ДД');
    });

    it('Должен выкинуть ошибку при передаче неверного формата данных', () => {
        expect(() => IsoToRu('123')).toThrowError('Ожидалась дата формата ГГГГ-ММ-ДД');
    });

    it('Должен вернуть верные данные', () => {
        const date = IsoToRu('2020-01-01');
        expect(date).toEqual('01.01.2020');
    });
});
