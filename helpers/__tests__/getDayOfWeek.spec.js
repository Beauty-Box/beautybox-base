import { getDayOfWeek } from '../getDayOfWeek';

describe('Тест функции getDayOfWeek', () => {
    it('Должен правильно вернуть данные', () => {
        const dayOfWeek = getDayOfWeek('2021-01-20');
        expect(dayOfWeek).toEqual('среда');
    });

    it('Должен правильно вернуть данные', () => {
        expect(() => getDayOfWeek('123')).toThrowError('Ожидалась дата формата ГГГГ-ММ-ДД');
    });
});
