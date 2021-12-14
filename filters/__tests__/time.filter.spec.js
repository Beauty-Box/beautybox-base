import { describe, it, expect } from '@jest/globals';
import { timeFilter } from '../time.filter';

describe('time format testing', () => {
    it('should return correct 2-digit time', () => {
        expect(timeFilter('17:07', '2021-03-29')).toEqual('17:07');
    });
});
