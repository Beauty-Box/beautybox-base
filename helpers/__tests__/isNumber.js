import { isNumber } from '../isNumber';

describe('Тест функции isNumber', () => {
    it('Должна вернуть true', () => {
        const result = isNumber(0);
        expect(result).toEqual(true);
    });

    it('Должна вернуть true', () => {
        const result = isNumber(15);
        expect(result).toEqual(true);
    });

    it('Должна вернуть true', () => {
        const result = isNumber('20');
        expect(result).toEqual(true);
    });

    it('Должна вернуть true', () => {
        const result = isNumber('20.14');
        expect(result).toEqual(true);
    });

    it('Должна вернуть false', () => {
        const result = isNumber([]);
        expect(result).toEqual(true);
    });

    it('Должна вернуть false', () => {
        const result = isNumber('20.14.12');
        expect(result).toEqual(true);
    });
});
