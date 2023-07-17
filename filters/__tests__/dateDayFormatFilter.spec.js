import { dateDayFormatFilter } from '../dateDayFormatFilter';

describe('date formatting testing', () => {
    it('should return long weekday', () => {
        expect(dateDayFormatFilter('2021-03-26')).toEqual('пятница');
    });
    it('should return short weekday', () => {
        expect(dateDayFormatFilter('2021-03-26', 'short')).toEqual('пт');
    });
    it('should return narrow weekday', () => {
        expect(dateDayFormatFilter('2021-03-26', 'narrow')).toEqual('П');
    });
});
