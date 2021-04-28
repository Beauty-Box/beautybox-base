import { getFirstLastDayToWeekAsRange } from '../getFirstLastDayToWeekAsRange';

describe('Тест функции getFirstLastDayToWeek', () => {
    it('Функция должна правильно создать массив', () => {
        const array = getFirstLastDayToWeekAsRange();
        expect(array).toHaveLength(2);
        expect(new Date(array[0]).getDay()).toEqual(1);
        expect(new Date(array[1]).getDay()).toEqual(0);
    });
});
