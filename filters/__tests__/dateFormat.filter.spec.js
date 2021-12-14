import { dateFormat } from '../dateFormat.filter';
import { describe, it, expect } from '@jest/globals';

describe('date format testing', () => {
    it('should return correct date locale', () => {
        expect(dateFormat('2021-03-29')).toEqual('пн, 29 мар.');
    });
});
