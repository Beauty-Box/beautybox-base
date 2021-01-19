import { SortArrayByArray } from '../SortArrayByArray';

describe('Тестирует функцию сортировки массива по массиву', () => {
    it('Функция должна вернуть ошибку, если первый параметр не массив', () => {
        expect(() => SortArrayByArray('test', [])).toThrowError(
            'Передаваемый параметр не является массив'
        );
    });

    it('Функция должна вернуть ошибку, если эталонный параметр не является массивом', () => {
        expect(() => SortArrayByArray([], 'test')).toThrowError(
            'Эталонный параметр не является массивом'
        );
    });

    it('Функция должна вернуть пустой массив', () => {
        const data = [0, 1, 2];
        const array = SortArrayByArray(data, []);
        expect(array).toEqual(expect.arrayContaining([]));
    });

    it('Функция должна вернуть исходный массив', () => {
        const array = SortArrayByArray([0, 1, 2], [0, 1, 2]);
        expect(array).toEqual(expect.arrayContaining([0, 1, 2]));
    });

    it('Функция должна вернуть верно отсортированый массив', () => {
        const array = SortArrayByArray([1, 0, 2], [0, 2]);
        expect(array).toEqual(expect.arrayContaining([0, 2]));
    });

    it('Функция должна вернуть верно отсортированый массив', () => {
        const array = SortArrayByArray([1, 2], [0, 2]);
        expect(array).toEqual(expect.arrayContaining([2]));
    });

    it('Функция должна вернуть пустой массив', () => {
        const array = SortArrayByArray();
        expect(array).toEqual(expect.arrayContaining([]));
    });
});
