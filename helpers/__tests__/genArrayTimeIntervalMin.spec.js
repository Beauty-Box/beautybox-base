import { genArrayTimeIntervalMin } from '../genArrayTimeIntervalMin';

describe('genArrayTimeIntervalMin', () => {
    it('Должен вернуть пустой массив при передаче значения меньше 15', () => {
        const result = genArrayTimeIntervalMin(14);
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(0);
    });

    it('Должен вернуть массив объектов при передаче значения больше 15', () => {
        const result = genArrayTimeIntervalMin(16);
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(1);
        result.forEach((item, index) => {
            expect(item).toHaveProperty('value', (index + 1) * 15);
            expect(item).toHaveProperty('text');
        });
    });

    it('Должен вернуть массив объектов при передаче большого целого числа', () => {
        const result = genArrayTimeIntervalMin(24 * 60);
        expect(result).toBeInstanceOf(Array);
        result.forEach((item, index) => {
            expect(item).toHaveProperty('value', (index + 1) * 15);
            expect(item).toHaveProperty('text');
        });
    });

    it('Должен вернуть массив объектов с интевалом 5 минут', () => {
        const result = genArrayTimeIntervalMin(600, 5, true);
        expect(result).toBeInstanceOf(Array);
        result.forEach((item, index) => {
            expect(item).toHaveProperty('value', (index + 1) * 5);
            expect(item).toHaveProperty('text');
        });
    });

    it('Должен выбросить исключение при передаче большого целого числа', () => {
        expect(() =>
            genArrayTimeIntervalMin(
                1000000000000000000000000000000000000000000000000110101001010100121121211
            )
        ).toThrowError('Число слишком большое, что может привести к переполнению памяти');
    });

    it('Должен выбросить исключение при передаче нецелого числа', () => {
        expect(() => genArrayTimeIntervalMin(75.5)).toThrowError(
            'Аргумент number должен быть целым'
        );
    });

    it('Должен выбросить исключение при передаче нецелого отрицательного числа', () => {
        expect(() => genArrayTimeIntervalMin(-75.5)).toThrowError(
            'Аргумент number должен быть целым'
        );
    });

    it('Должен выбросить исключение при передаче отрицалетьного числа', () => {
        expect(() => genArrayTimeIntervalMin(-1)).toThrowError('Число должно быть положительным');
    });

    it('Должен выбросить исключение при передаче undefined', () => {
        expect(() => genArrayTimeIntervalMin(undefined)).toThrowError(
            'Аргумент number должен быть целым'
        );
    });

    it('Должен выбросить исключение при передаче пустой строки', () => {
        expect(() => genArrayTimeIntervalMin('')).toThrowError('Аргумент number должен быть целым');
    });

    it('Должен выбросить исключение при передаче строки ввиде целого числа', () => {
        expect(() => genArrayTimeIntervalMin('75')).toThrowError(
            'Аргумент number должен быть целым'
        );
    });

    it('Должен выбросить исключение при передаче boolean значения', () => {
        expect(() => genArrayTimeIntervalMin(true)).toThrowError(
            'Аргумент number должен быть целым'
        );
    });

    it('Должен выбросить исключение при передаче массива', () => {
        expect(() => genArrayTimeIntervalMin([])).toThrowError('Аргумент number должен быть целым');
    });
});
