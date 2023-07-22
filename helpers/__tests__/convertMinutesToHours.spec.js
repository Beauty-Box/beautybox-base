import { convertMinutesToHours } from '../convertMinutesToHours';

describe('convertMinutesToHours', () => {
    it('Должен вернуть ожидаемый результат', () => {
        const hours = convertMinutesToHours(75);
        expect(hours).toBe('1 час 15 минут');
    });
    it('Должен вернуть ожидаемый результат', () => {
        const hours = convertMinutesToHours(200);
        expect(hours).toBe('3 часа 20 минут');
    });
    it('Должен вернуть ожидаемый результат', () => {
        const hours = convertMinutesToHours(1200);
        expect(hours).toBe('20 часов');
    });
    it('Должен вернуть ожидаемый результат', () => {
        const hours = convertMinutesToHours(1000000000000);
        expect(hours).toBe('16666666666 часов 40 минут');
    });
    it('Должен вернуть текст времени в минутах', () => {
        const hours = convertMinutesToHours(45);
        expect(hours).toBe('45 минут');
    });
    it('Должен вернуть текст времени в минутах сокращенных', () => {
        const hours = convertMinutesToHours(45, true);
        expect(hours).toBe('45 мин');
    });

    it('Должен вернуть строку 0 при передаче числа 0', () => {
        const hours = convertMinutesToHours(0);
        expect(hours).toEqual('0');
    });

    it('Должен выбросить исключение при передаче нецелого числа', () => {
        expect(() => convertMinutesToHours(75.5)).toThrowError('Аргумент number должен быть целым');
    });

    it('Должен выбросить исключение при передаче нецелого отрицательного числа', () => {
        expect(() => convertMinutesToHours(-75.5)).toThrowError(
            'Аргумент number должен быть целым'
        );
    });

    it('Должен выбросить исключение при передаче целого отрицательного числа', () => {
        expect(() => convertMinutesToHours(-1)).toThrowError('Число должно быть положительным');
    });

    it('Должен выбросить исключение при передаче undefined', () => {
        expect(() => convertMinutesToHours(undefined)).toThrowError(
            'Аргумент number должен быть целым'
        );
    });

    it('Должен выбросить исключение при передаче пустой строки', () => {
        expect(() => convertMinutesToHours('')).toThrowError('Аргумент number должен быть целым');
    });

    it('Должен выбросить исключение при передаче строки ввиде целого числа', () => {
        expect(() => convertMinutesToHours('75')).toThrowError('Аргумент number должен быть целым');
    });

    it('Должен выбросить исключение при передаче boolean значения', () => {
        expect(() => convertMinutesToHours(true)).toThrowError('Аргумент number должен быть целым');
    });

    it('Должен выбросить исключение при передаче массива', () => {
        expect(() => convertMinutesToHours([])).toThrowError('Аргумент number должен быть целым');
    });
});
