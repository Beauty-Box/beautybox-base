import { genNumberStringArrayRevert } from '../genNumberStringArrayRevert';

describe('Тест функции genNumberArray', () => {
    it('Должна создать ожидаемый массив', () => {
        const array = genNumberStringArrayRevert(10, 20);
        expect(array).toEqual(
            expect.arrayContaining([
                '20',
                '19',
                '18',
                '17',
                '16',
                '15',
                '14',
                '13',
                '12',
                '11',
                '10',
            ])
        );
    });
});
