import { genArrayTime15min } from '../genArrayTime15min';

describe('genArrayTime15min', () => {
    it('Должен вернуть пустой массив при передаче значения меньше 15', () => {
        const result = genArrayTime15min(14);
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(0);
    });

    it('Должен вернуть массив объектов при передаче значения больше 15', () => {
        const result = genArrayTime15min(16);
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(1);
        result.forEach((item, index) => {
            expect(item).toHaveProperty('value', (index + 1) * 15);
            expect(item).toHaveProperty('text');
        });
    });

    it('Должен вернуть массив объектов при передаче большого целого числа', () => {
        const result = genArrayTime15min(24 * 60);
        expect(result).toBeInstanceOf(Array);
        result.forEach((item, index) => {
            expect(item).toHaveProperty('value', (index + 1) * 15);
            expect(item).toHaveProperty('text');
        });
    });

    it('Должен выбросить исключение при передаче большого целого числа', () => {
        expect(() =>
            genArrayTime15min(
                1000000000000000000000000000000000000000000000000110101001010100121121211
            )
        ).toThrowError('Число слишком большое, что может привести к переполнению памяти');
    });

    it('Должен выбросить исключение при передаче нецелого числа', () => {
        expect(() => genArrayTime15min(75.5)).toThrowError('Аргумент number должен быть целым');
    });

    it('Должен выбросить исключение при передаче нецелого отрицательного числа', () => {
        expect(() => genArrayTime15min(-75.5)).toThrowError('Аргумент number должен быть целым');
    });

    it('Должен выбросить исключение при передаче отрицалетьного числа', () => {
        expect(() => genArrayTime15min(-1)).toThrowError('Число должно быть положительным');
    });

    it('Должен выбросить исключение при передаче undefined', () => {
        expect(() => genArrayTime15min(undefined)).toThrowError(
            'Аргумент number должен быть целым'
        );
    });

    it('Должен выбросить исключение при передаче пустой строки', () => {
        expect(() => genArrayTime15min('')).toThrowError('Аргумент number должен быть целым');
    });

    it('Должен выбросить исключение при передаче строки ввиде целого числа', () => {
        expect(() => genArrayTime15min('75')).toThrowError('Аргумент number должен быть целым');
    });

    it('Должен выбросить исключение при передаче boolean значения', () => {
        expect(() => genArrayTime15min(true)).toThrowError('Аргумент number должен быть целым');
    });

    it('Должен выбросить исключение при передаче массива', () => {
        expect(() => genArrayTime15min([])).toThrowError('Аргумент number должен быть целым');
    });
});
