import { joinQuery } from '../joinQuery';
import { beforeEach, describe, expect, it } from '@jest/globals';

let uri;
let uri2;
let uri3;
let key;
let value;
describe('regular expression for query params', () => {
    beforeEach(() => {
        uri = 'post';
        key = 'key';
        value = '2';
        uri2 = '&key=1&';
        uri3 = 'post?';
    });

    it('should return match', () => {
        expect(joinQuery(uri, key, value)).toEqual('post?key=2');
    });

    it('should match regexp', () => {
        expect(joinQuery(uri2, key, value)).toEqual('&key=2&');
    });
    it('should work without params', () => {
        expect(joinQuery()).toEqual('?=');
    });
    it('should uri contain ?', () => {
        expect(joinQuery(uri3, key, value)).toEqual('post?&key=2');
    });
});
