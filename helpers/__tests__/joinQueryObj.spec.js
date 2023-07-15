import { joinQueryObj } from '../joinQueryObj';

describe('test building query string from object', () => {
    it('should return empty string', () => {
        const queryObj = {};
        const queryString = '';
        expect(joinQueryObj()).toEqual('');
    });

    it('should return query string', () => {
        const queryObj = {
            key: 1,
            key3: 3,
        };
        const queryString = '?startkey=2';
        expect(joinQueryObj(queryObj, queryString)).toEqual('?startkey=2&key=1&key3=3');
    });
});
