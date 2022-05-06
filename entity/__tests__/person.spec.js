import { describe, it, expect, beforeEach } from '@jest/globals';

jest.mock('../../api/index.js');

import { Person } from '../Person';

const config = {
    baseUrl: 'test',
    module: 'test',
    token: 'test',
};

describe('person testing', () => {
    let person;

    beforeEach(() => {
        person = new Person(config);
    });
    it('Должен вернуть дату рождения в виде объекта', () => {
        expect(person.convertBirthday).toEqual({
            day: '',
            month: '',
            year: '',
        });
        person.birthday = '1998-11-23';
        expect(person.convertBirthday).toEqual({
            day: '23',
            month: '11',
            year: '1998',
        });
    });
    it('Должена очищатся ошибка с указанным ключом', () => {
        person.clearError();
        expect(person.errors).toEqual({});
        person.errors = {
            '1': 'TypeError',
            '2': 'Syntax error',
        };
        person.clearError('1');
        expect(person.errors).toEqual({
            '2': 'Syntax error',
        });
    });

    it('_resConvert должен содержать ошибку', () => {
        person._resConvert({
            error: 'TypeError',
        });
        expect(Object.keys(person)).toHaveLength(9);
    });
});
