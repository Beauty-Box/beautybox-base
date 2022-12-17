import { describe, it, expect } from '@jest/globals';
import { timeFilter } from '../time.filter';

describe('time format testing', () => {
    it('should return correct 2-digit time with Z', () => {
        expect(timeFilter('2022-12-17T15:09:12.000000Z')).toEqual('19:09');
    });
    it('should return correct 2-digit time without Z', () => {
        expect(timeFilter('2022-12-17T15:09:12.000000')).toEqual('15:09');
    });
});
