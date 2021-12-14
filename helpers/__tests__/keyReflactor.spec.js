import { reflectKeys } from '../keyReflactor';
import { describe, expect, it } from '@jest/globals';

describe('key mirror testing', () => {
    it('should return mirror object', () => {
        const object = ['key1', 'key2'];
        const prefix = 'pref';
        expect(reflectKeys(object, prefix)).toEqual({
            key1: 'pref key1',
            key2: 'pref key2',
        });
    });
    it('should return empty object', () => {
        expect(reflectKeys()).toEqual({});
    });
    it('should return keys itself', () => {
        const object = ['key1', 'key2'];
        expect(reflectKeys(object, '')).toEqual({
            key1: 'key1',
            key2: 'key2',
        });
    });
});
