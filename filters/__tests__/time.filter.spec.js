import { timeFilter } from '../time.filter';

describe('time format testing', () => {
    it('should return correct 2-digit time with timezone', () => {
        expect(timeFilter('2022-12-17T19:09:12.000000+04:00')).toEqual('19:09');
    });
    it('should return correct 2-digit time without Z', () => {
        expect(timeFilter('2022-12-17T15:09:12.000000')).toEqual('15:09');
    });
});
