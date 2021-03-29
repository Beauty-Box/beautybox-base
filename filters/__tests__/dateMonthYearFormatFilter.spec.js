import { describe, it, expect } from '@jest/globals';
import { dateMonthYearFormatFilter } from '../dateMonthYearFormatFilter';

describe('date month year locale testing', () => {
    it('should return correct month year date locale', () => {
        expect(dateMonthYearFormatFilter('2021-03-29')).toEqual('29 мар 2021');
    });
});
