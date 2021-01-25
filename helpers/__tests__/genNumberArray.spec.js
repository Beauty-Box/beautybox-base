import { genNumberArray } from '../genNumberArray';

describe('Тест функции genNumberArray', () => {
    it('Должна создать ожидаемый массив', () => {
        const array = genNumberArray(10, 20);
        expect(array).toEqual(expect.arrayContaining([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]));
    });
});
