import { getYesterdayAsRange } from '../getYesterdayAsRange';

describe('Тест функции getYesterdayAsRange', () => {
    it('Функция должна создать правильный массив', () => {
        const today = new Date();
        const yesterday = new Date(today.setDate(today.getDate() - 1)).toISOString().slice(0, 10);
        const array = getYesterdayAsRange();
        expect(array).toHaveLength(2);
        expect(array[0]).toEqual(yesterday);
        expect(array[1]).toEqual(yesterday);
    });
});
