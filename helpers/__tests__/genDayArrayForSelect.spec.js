import { genDayArrayForSelect } from '../genDayArrayForSelect';

describe('genDayArrayForSelect', () => {
    it('Должен вернуть с длинной 14', () => {
        const result = genDayArrayForSelect(14);
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(14);
        result.forEach((item, index) => {
            expect(item).toHaveProperty('value', (index + 1).toString().padStart(2, '0'));
            expect(item).toHaveProperty('text', index + 1);
        });
    });

    it('Должен вернуть с длинной 16', () => {
        const result = genDayArrayForSelect(16);
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(16);
        result.forEach((item, index) => {
            expect(item).toHaveProperty('value', (index + 1).toString().padStart(2, '0'));
            expect(item).toHaveProperty('text', index + 1);
        });
    });

    it('Должен выбросить исключение при передаче числа больше 31', () => {
        expect(() => genDayArrayForSelect(32)).toThrowError(
            'Передаваемый параметр не должен превышать максимальное число дней в месяце (31)'
        );
    });

    it('Должен выбросить исключение при передаче нецелого числа', () => {
        expect(() => genDayArrayForSelect(75.5)).toThrowError('Аргумент number должен быть целым');
    });

    it('Должен выбросить исключение при передаче нецелого отрицательного числа', () => {
        expect(() => genDayArrayForSelect(-75.5)).toThrowError('Аргумент number должен быть целым');
    });

    it('Должен выбросить исключение при передаче целого отрицательного числа', () => {
        expect(() => genDayArrayForSelect(-1)).toThrowError(
            'Передаваемый параметр не должен быть меньше 0'
        );
    });

    it('Должен выбросить исключение при передаче undefined', () => {
        expect(() => genDayArrayForSelect(undefined)).toThrowError(
            'Аргумент number должен быть целым'
        );
    });

    it('Должен выбросить исключение при передаче пустой строки', () => {
        expect(() => genDayArrayForSelect('')).toThrowError('Аргумент number должен быть целым');
    });

    it('Должен выбросить исключение при передаче строки ввиде целого числа', () => {
        expect(() => genDayArrayForSelect('75')).toThrowError('Аргумент number должен быть целым');
    });

    it('Должен выбросить исключение при передаче boolean значения', () => {
        expect(() => genDayArrayForSelect(true)).toThrowError('Аргумент number должен быть целым');
    });

    it('Должен выбросить исключение при передаче массива', () => {
        expect(() => genDayArrayForSelect([])).toThrowError('Аргумент number должен быть целым');
    });
});
