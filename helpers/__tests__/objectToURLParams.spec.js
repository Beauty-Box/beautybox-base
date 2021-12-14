import { objectToURLParams } from '../objectToURLParams';

import { describe, it, expect } from '@jest/globals';

describe('testing URL querystring built from object', () => {
    it('should return query string', () => {
        expect(
            objectToURLParams({
                id: 22,
                username: 'Vasya',
            })
        ).toEqual('?id=22&username=Vasya');
    });
});
