import { joinQueryRecursive } from '../joinQueryRecursive';
import { beforeEach, describe, expect, it } from '@jest/globals';

describe('regular expression for query params', () => {
    let containObject;
    let containArray;
    beforeEach(() => {
        containObject = {};
        containArray = {
            nameFilter: '',
            customerActivity: 'permanent',
            visitPeriodFrom: '2022-08-01',
            visitPeriodTo: '2022-08-17',
            visitExists: 'false',
            visitCountFrom: '',
            visitCountTo: '',
            visitOnline: 'true',
            visitStatus: 'cancel',
            clientGender: 2,
            clientBirthdayFrom: '2022-08-03',
            clientBirthdayTo: '2022-08-03',
            clientAgeFrom: '7',
            clientAgeTo: '20',
            'employees[]': [48683, 36718, 11877, 48557, 31598],
            'services[]': [25565, 97154],
            profitFrom: '10',
            profitTo: '',
            averageCheckFrom: '',
            averageCheckTo: '10000000',
        };
    });

    it('should return encoded object', () => {});
    it('should return encoded array', () => {
        console.log(joinQueryRecursive(containArray));
        expect(joinQueryRecursive(containArray)).toEqual(
            'nameFilter=&customerActivity=permanent&visitPeriodFrom=2022-08-01&visitPeriodTo=2022-08-17&visitExists=false&visitCountFrom=&visitCountTo=&visitOnline=true&visitStatus=cancel&clientGender=2&clientBirthdayFrom=2022-08-03&clientBirthdayTo=2022-08-03&clientAgeFrom=7&clientAgeTo=20&employees[]=48683&employees[]=36718&employees[]=11877&employees[]=48557&employees[]=31598&services[]=25565&services[]=97154&profitFrom=10&profitTo=&averageCheckFrom=&averageCheckTo=10000000'
        );
    });
    // it('should return match', () => {
    //     expect(joinQueryRecursive(uri, key, value)).toEqual('post?key=2');
    // });
    //
    // it('should match regexp', () => {
    //     expect(joinQueryRecursive(uri2, key, value)).toEqual('&key=2&');
    // });
    // it('should work without params', () => {
    //     expect(joinQueryRecursive()).toEqual('?=');
    // });
    // it('should uri contain ?', () => {
    //     expect(joinQueryRecursive(uri3, key, value)).toEqual('post?&key=2');
    // });
});
