import { parsePhone } from '../parsePhone';

import { describe, it, expect } from '@jest/globals';

describe('parsePhone testing', () => {
    it('should return empty string', () => {
        expect(parsePhone()).toEqual('');
    });
    it('should return phone without spaces and dashes', () => {
        expect(parsePhone('+7 (800) 555-35-35')).toEqual('88005553535');
    });

    it('should return phone without letters', () => {
        expect(parsePhone('+7 (800) abc-35-35')).toEqual('88003535');
    });
});
