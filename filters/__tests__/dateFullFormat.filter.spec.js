import { dateFullFormat } from '../dateFullFormat.filter';

describe('full date testing', () => {
    it('should return full date locale', () => {
        expect(dateFullFormat('2021-03-29')).toEqual('понедельник, 29 марта 2021');
    });
});
