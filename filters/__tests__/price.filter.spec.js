import { priceFilter } from '../price.filter';

describe('price filter testing', () => {
    it('should return correct price', () => {
        expect(priceFilter(300)).toEqual('300' + String.fromCharCode(160) + '₽');
    });

    it('should return zero price', () => {
        expect(priceFilter()).toEqual('0' + String.fromCharCode(160) + '₽');
    });
});
