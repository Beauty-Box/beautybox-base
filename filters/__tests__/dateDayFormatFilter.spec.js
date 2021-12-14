import { dateDayFormatFilter } from '../dateDayFormatFilter';
import { describe, it, expect } from '@jest/globals';

describe('date formatting testing', () => {
    // для корректной работы локалей в 12 версии Node.js нужно подгурзить
    // npm install full-icu --save
    // npm install cross-env --save
    // также необохдимо прописать флаг для jest при запуске npm test в package.json
    // подробнее https://stackoverflow.com/questions/23199909/using-tolocalestring-in-node-js/23200062#23200062

    it('should return long weekday', () => {
        expect(dateDayFormatFilter('2021-03-26')).toEqual('пятница');
    });
    it('should return short weekday', () => {
        expect(dateDayFormatFilter('2021-03-26', 'short')).toEqual('пт');
    });
    it('should return narrow weekday', () => {
        expect(dateDayFormatFilter('2021-03-26', 'narrow')).toEqual('П');
    });
});