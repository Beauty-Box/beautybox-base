import { objectToURLParams } from '../objectToURLParams';

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
