import { getFirstLastDayToWeekAsRange } from '../getFirstLastDayToWeekAsRange';

describe('Тест функции getFirstLastDayToWeek', () => {
    it('Функция должна правильно создать массив', () => {
        const array = getFirstLastDayToWeekAsRange();
        expect(array).toHaveLength(2);
        expect(array[0]).toEqual('2021-03-29');
        expect(array[1]).toEqual('2021-04-04');
    });
});
