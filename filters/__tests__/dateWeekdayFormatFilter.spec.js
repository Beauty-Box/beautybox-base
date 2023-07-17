import { dateWeekdayFormatFilter } from '../dateWeekdayFormatFilter';

describe('date weekday locale testing', () => {
    it('should return correct weekday date locale', () => {
        expect(dateWeekdayFormatFilter('2022-12-16', 'long')).toEqual('пятница');
    });
});
