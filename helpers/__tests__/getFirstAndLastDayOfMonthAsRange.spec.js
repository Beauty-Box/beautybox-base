import { getFirstAndLastDayOfMonthAsRange } from '../getFirstAndLastDayOfMonthAsRange';

describe('Тест функции getFirstAndLastDayOfMonthAsRange', () => {
    it('Функция должна правильно создать массив', () => {
        const array = getFirstAndLastDayOfMonthAsRange();
        expect(array).toHaveLength(2);
    });
});
