import { getFirstAndLastDayOfYearAsRange } from '../getFirstAndLastDayOfYearAsRange';

describe('Тест функции getFirstAndLastDayOfYearAsRange', () => {
    it('Функция должна правильно создать массив', () => {
        const array = getFirstAndLastDayOfYearAsRange();
        expect(array).toHaveLength(2);
    });
});
