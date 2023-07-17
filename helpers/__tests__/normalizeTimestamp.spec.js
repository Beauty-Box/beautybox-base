import { normalizeTimestamp } from '../normalizeTimestamp';

describe('normalizeTimestamp', () => {
    it('пробел должен быть заменен на букву T', () => {
        const timestamp = '2023-06-29 15:13';
        const result = '2023-06-29T15:13';
        expect(normalizeTimestamp(timestamp)).toBe(result);
    });

    it('Должна быть возвращена исходная дата', () => {
        const timestamp = '2023-06-29T15:13';
        expect(normalizeTimestamp(timestamp)).toBe(timestamp);
    });

    it('Должна быть возвращена исходная дата', () => {
        const timestamp = '2023-06-29';
        expect(normalizeTimestamp(timestamp)).toBe(timestamp);
    });
});
