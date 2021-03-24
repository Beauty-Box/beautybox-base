import { getFirstLastDayToWeek } from '../getFirstLastDayToWeek';

describe('Тест функции getFirstLastDayToWeek', () => {
    it('Функция должна правильно создать массив', () => {
        const array = getFirstLastDayToWeek('2021-01-20');
        expect(array).toHaveProperty('first');
        expect(array).toHaveProperty('last');
        expect(array.first.toISOString().slice(0, 10)).toEqual('2021-01-18');
        expect(array.last.toISOString().slice(0, 10)).toEqual('2021-01-24');
    });

    it('Функция должна правильно создать массив', () => {
        const array = getFirstLastDayToWeek('2020-12-31');
        expect(array).toHaveProperty('first');
        expect(array).toHaveProperty('last');
        expect(array.first.toISOString().slice(0, 10)).toEqual('2020-12-28');
        expect(array.last.toISOString().slice(0, 10)).toEqual('2021-01-03');
    });

    it('Функция должна правильно создать массив', () => {
        const array = getFirstLastDayToWeek('2020-12-28');
        expect(array).toHaveProperty('first');
        expect(array).toHaveProperty('last');
        expect(array.first.toISOString().slice(0, 10)).toEqual('2020-12-28');
        expect(array.last.toISOString().slice(0, 10)).toEqual('2021-01-03');
    });
    it('тест лог функции даты', () => {
        const array = getFirstLastDayToWeek('2021-03-19');
        expect(array.first.toISOString().slice(0, 10)).toEqual('2021-03-15');
        expect(array.last.toISOString().slice(0, 10)).toEqual('2021-03-21');
    });
});
